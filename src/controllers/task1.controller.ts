import express from 'express'
import { IController } from '../interfaces/controller.interface'

class Task1Controller implements IController {
    public path = '/task1'
    public router = express.Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(this.path, this.task1)
    }

    private task1 = (req: express.Request, res: express.Response) => {
        const query = req.query

        const currentDate = new Date()
        const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const task1 = {
            slack_name: query.slack_name,
            current_day: WEEKDAYS[currentDate.getDay()],
            utc_time: currentDate.toISOString().split('.')[0] + 'Z',
            track: query.track,
            github_file_url: process.env.GITHUB_FILE_URL,
            github_repo_url: process.env.GITHUB_REPO_URL,
            status_code: 200,
        }
        res.json(task1)
    }
}

export default Task1Controller