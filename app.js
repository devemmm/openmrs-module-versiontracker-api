require('dotenv-flow').config();
require('./src/database/dbConfig')
const express = require('express')
const appRoute = require('./src/router/app')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = process.env.PORT
app.use(cors())


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/module/api', appRoute)

app.listen(port, () => console.log(`SQL Upload API is running on port ${port}`))

const { db } = require('./src/database/dbConfig')
// db.sync()
//     .then((result) => console.log("table created"))
//     .catch((error) => console.log("error ocp", error.message))
