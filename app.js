require('dotenv-flow').config();
require('./src/database/dbConfig')
const path = require('path')
const express = require('express')
const appRoute = require('./src/router/app')
const bodyParser = require('body-parser')
const cors = require('cors')


const app = express();
const port = process.env.PORT


app.use(cors())

const publicDirectoryPath1 = path.join(__dirname, '/var/lib/OpenMRS/modules')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(publicDirectoryPath1))
app.use(appRoute)

app.listen(port, () => console.log(`SQL Upload API is running on port ${port}`))
