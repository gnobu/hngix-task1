import * as express from 'express'
import { IController } from '../interfaces/controller.interface'
// import { IOperationBody, OPERATION } from '../interfaces/math.interface'
// import { add, divide, multiply, subtract } from '../utils/math.util'

class Hng implements IController {
    public path = '/hng'
    public router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(`${this.path}/task1`, this.task1)
        // this.router.post(`${this.path}/task2`, this.task2)
    }

    private task1 = (req: express.Request, res: express.Response) => {
        const query = req.query

        const currentDate = new Date()
        const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const task1 = {
            slack_name: query.slack_name,
            current_day: WEEKDAYS.at(currentDate.getDay()),
            utc_time: currentDate,
            track: query.track,
            github_file_url: process.env.GITHUB_FILE_URL,
            github_repo_url: process.env.GITHUB_REPO_URL,
            status_code: 200,
        }
        res.json(task1)
    }

    // private task2 = (req: express.Request, res: express.Response) => {
    //     const quest: IOperationBody = req.body

    //     const isAdd = (quest.operation_type).match(/(ad\w+)|(sum\w+)/ig)
    //     const isMinus = (quest.operation_type).match(/(minus)|(subtract)|(difference)/ig)
    //     const isMult = (quest.operation_type).match(/(mult\w+)|(times)/ig)
    //     const isDivide = (quest.operation_type).match(/(div\w+)|(ratio)/ig)
    //     const nums = quest.operation_type.match(/\d+/g)

    //     let result
    //     switch (quest.operation_type.toLowerCase()) {
    //         case OPERATION.addition:
    //             result = +quest.x + +quest.y
    //             return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.addition })
    //         case OPERATION.subtraction:
    //             result = +quest.x - +quest.y
    //             return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.subtraction })
    //         case OPERATION.multiplication:
    //             result = +quest.x * +quest.y
    //             return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.multiplication })
    //         case OPERATION.division:
    //             result = parseFloat((+quest.x / +quest.y).toFixed(2))
    //             return res.json({ "slackUsername": "gnobu", result, "operation_type": OPERATION.division })
    //         default:
    //             if (isAdd && nums?.length) {
    //                 result = add(...nums)
    //                 return res.json({ "slackUsername": "gnobu", result, "operation_type": isAdd[0] })
    //             } else if (isMinus && nums?.length) {
    //                 result = subtract(...nums)
    //                 return res.json({ "slackUsername": "gnobu", result, "operation_type": isMinus[0] })
    //             } else if (isMult && nums?.length) {
    //                 result = multiply(...nums)
    //                 return res.json({ "slackUsername": "gnobu", result, "operation_type": isMult[0] })
    //             } else if (isDivide && nums?.length) {
    //                 result = divide(...nums)
    //                 return res.json({ "slackUsername": "gnobu", result, "operation_type": isDivide[0] })
    //             }
    //             res.json({ "slackUsername": "gnobu", "result": null, "operation_type": quest.operation_type })
    //     }
    // }
}

export default Hng