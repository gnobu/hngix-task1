import { ErrorRequestHandler } from "express"
import { logEvent } from "../utils/logger.util"
import isDevMode from "../utils/checkNodeEnv.util"
import { CustomError } from "../errors/custom.error"

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Save to log file
    const errMsg = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`
    logEvent(errMsg, 'errLog.log')

    // Log to console in dev mode
    isDevMode() && console.log(err)

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() })
    }

    res.status(500).json({
        errors: [{ message: 'Something went wrong' }]
    })
}
