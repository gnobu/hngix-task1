import express from "express"

const PORT = 5000
const URL = 'http://localhost:5000'

const app = express()

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