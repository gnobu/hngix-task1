require('dotenv').config()
import App from "./app";
import Home from "./controllers/home.controller";
import Zuri from "./controllers/zuri.controller";

// Variable declarations
const URL = process.env.URL || 'http://localhost:5000'
const PORT = process.env.PORT || 5000

const app = new App([
    new Zuri(),
    new Home(URL),
], PORT, URL)

app.listen()