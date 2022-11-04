import * as express from 'express'
import { IController } from '../interfaces/controller.interface';

class Zuri implements IController {
    public path = '/zuri'
    public router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(`${this.path}/task1`, this.task1)
    }

    private task1 = (req: express.Request, res: express.Response) => {
        const task1: {
            slackUsername: string;
            backend: boolean;
            age: number;
            bio: String
        } = {
            slackUsername: 'gnobu',
            backend: true,
            age: 28,
            bio: "Nothing to see here. Just a MERN stack developer"
        }
        res.json(task1)
    }
}

export default Zuri