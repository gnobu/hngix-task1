import express from "express"
import { IController } from "../interfaces/controller.interface"

class Home implements IController {
    public path = '/'
    public router = express.Router()
    public URL: string

    constructor(URL: string){
        this.URL = URL
        this.initializeRoutes()
    }

    public initializeRoutes = () => {
        this.router.get(this.path, this.getHome)
    }
    
    private getHome = (req: express.Request, res: express.Response) => {
        res.send(`Head to "${this.URL}/api/task1" to get the task1 response`)
    }
}

export default Home