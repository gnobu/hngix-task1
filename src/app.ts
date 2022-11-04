import express from "express"
import cors from "cors"
import { IController } from "./interfaces/controller.interface"

class App {
    public app: express.Application
    PORT: number | string
    URL: string

    constructor(controllers: IController[], PORT: number | string = 5000, URL: string = 'http://localhost:5000') {
        this.app = express()
        this.PORT = PORT
        this.URL = URL

        this.initializeMiddleware()
        this.initializeControllers(controllers)
    }

    public listen() {
        this.app.listen(this.PORT, () => { console.log(`App is running on ${this.URL}`) })
    }

    private initializeMiddleware() {
        this.app.use(cors())
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach(controller => {
            this.app.use('/', controller.router)
        })
    }
}

export default App