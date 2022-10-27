import express from "express"

const PORT = 5000
const URL = 'http://localhost:5000'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => { console.log(`App is running on ${URL}`) })