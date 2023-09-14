import { ErrorRequestHandler } from "express"
import { Error } from "mongoose"
import { logEvent } from "../utils/logger.util"
import isDevMode from "../utils/checkNodeEnv.util"
import { CustomError } from "../errors/custom.error"

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() })
    }
    if (err instanceof Error.ValidationError) {
        return res.status(400).json({ errors: [{ message: err.message.split(':').at(-1) ?? 'invalid format' }] })
    }
    if (err.code === 11000) {
        return res.status(409).json({ errors: [{ message: 'Duplicate error', field: 'name' }] })
    }
    
    // Not expected error
    // Save to log file and/or Log to console in dev mode
    isDevMode() && console.log(err)
    const errMsg = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    logEvent(errMsg, 'errLog.log')

    res.status(500).json({
        errors: [{ message: 'Something went wrong' }]
    })
}
