require('dotenv').config()

import App from "./app"
import Home from "./controllers/home.controller"
import Hng from "./controllers/hng.controller"
import validateEnv from "./utils/validateENV"

(async () => {
    // ensure required env variables are present
    validateEnv()
    // Other variables declaration
    const URL = process.env.URL || 'http://localhost:5000'
    const PORT = process.env.PORT || 5000

    const app = new App([
        new Hng(),
        new Home(URL),
    ], PORT, URL)

    app.listen()
})()