require('dotenv').config()
import express from "express"
import cors from "cors"

const PORT = process.env.PORT || 5000
const URL = process.env.URL || 'http://localhost:5000'

const app = express()

app.use(cors())

app.get('/', (req, res) => {
    res.send(`Head to "${URL}/api/task1" to get the task1 response`)
})

app.get('/api/task1', (req, res) => {
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
})

app.listen(PORT, () => { console.log(`App is running on ${URL}`) })