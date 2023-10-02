import express from "express"
import 'express-async-errors'
import cors from "cors"
import swaggerUi from 'swagger-ui-express'

import { IController } from "./interfaces/controller.interface"
import { errHandler } from "./middleware/errorHandler.middleware"
import { NotFoundError } from "./errors/not-found.error"
import path from "path"
import { swaggerSpec } from "./utils/swagger"

export default class App {
    private _app
    PORT: number | string
    URL: string

    constructor(controllers: IController[], PORT: number | string = 5000, URL: string = `http://localhost:${PORT}`) {
        this._app = express()
        this.PORT = PORT
        this.URL = URL

        this._initializeMiddleware()
        this._initializeControllers(controllers)
        this._initializeErrorMiddleware()
    }
    public listen() {
        this._app.listen(this.PORT, () => {
            console.log(`App is running on ${this.URL}`)
        })
    }
    private _initializeMiddleware() {
        this._app.use(express.json({ limit: '30MB' }))
        this._app.use(cors())
        this._app.use('/video', express.static(path.join(__dirname, '..', 'uploads')))
        this._app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
        this._app.get('/docs.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json')
            res.send(swaggerSpec)
        })
    }
    private _initializeErrorMiddleware() {
        this._app.use(errHandler)
    }
    private _initializeControllers(controllers: IController[]) {
        for (let controller of controllers) {
            this._app.use('/api', controller.router)
        }
        this._app.all('*', async (req, res) => {
            throw new NotFoundError()
        })
    }
    get app() {
        return this._app
    }
}