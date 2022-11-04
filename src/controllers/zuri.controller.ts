import * as express from 'express'
import { IController, IOperationBody, OPERATION } from '../interfaces/controller.interface';

class Zuri implements IController {
    public path = '/zuri'
    public router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(`${this.path}/task1`, this.task1)
        this.router.post(`${this.path}/task2`, this.task2)
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

    private task2 = (req: express.Request, res: express.Response) => {
        const quest: IOperationBody = req.body
        let result
        switch (quest.operation_type.toLowerCase()) {
            case OPERATION.addition:
                result = +quest.x + +quest.y
                return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.addition })
            case OPERATION.subtraction:
                result = +quest.x - +quest.y
                return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.subtraction })
            case OPERATION.multiplication:
                result = +quest.x * +quest.y
                return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.multiplication })
            case OPERATION.division:
                result = parseFloat((+quest.x / +quest.y).toFixed(2))
                return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.division })
            default:
                res.json({ "slackUsername": "gnobu", "result": null, "operation_type": quest.operation_type })
        }
    }
}

export default Zuri