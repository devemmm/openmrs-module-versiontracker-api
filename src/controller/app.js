const Service = require('../service/Service');
const { requireAuth } = require('../middleware/requireAuth')
const { db } = require('../database/dbConfig')

class Controller {
    index = [
        async (req, res) => {
            res.status(200).json({ statusCode: 200, status: "successfull", message: "OpenMRS omod version tracker" })
        }
    ]

    signup = [
        async (req, res) => {
            try {
                const { names, email, phone, password } = req.body
                if (!names || !email || !phone || !password) {
                    throw new Error('missing required value please check your request body')
                }
                const user = await new Service().signup(req.body)
                res.status(200).json({ statusCode: 201, status: "successfull", message: "user account created successfull", user })
            } catch (error) {
                res.status(500).json({ error: { statusCode: 500, status: "failed", message: error.message } })
            }
        }
    ]

    signin = [
        async (req, res) => {
            const { email, password } = req.body
            try {
                if (!email || !password) {
                    throw new Error("username and passoword required")
                }

                const { token } = await new Service().signin(email, password)

                res.status(200).json({ statusCode: 200, status: "successfull", message: "you are logged in", data: { token } })
            } catch (error) {
                res.status(400).json({ error: { statusCode: 400, status: "failed", message: error.message } })
            }
        }
    ]

    registerFacility = [
        requireAuth, async (req, res) => {
            try {
                // db.sync()
                //     .then((result) => console.log("table created"))
                //     .catch((error) => console.log("error ocpaied", error.message))
                let files = await new Service().registerHealthFacility(req.body);
                res.status(201).json({ statusCode: 200, status: "successfull", files })
            } catch (error) {
                res.status(400).json({ error: { statusCode: 400, status: "failed", message: error.message } })
            }
        }
    ]

    addUpdateModule = [
        async (req, res) => {
            try {
                let response = await new Service().addUpdateModule(req.body);
                res.status(201).json({ statusCode: 200, status: "successfull", response })
            } catch (error) {
                res.status(400).json({ error: { statusCode: 400, status: "failed", message: error.message } })
            }
        }
    ]

    facilityInfo = [
        requireAuth, async (req, res) => {
            try {
                let facilityInfo = await new Service().facilityInfo(req.params.id);
                res.status(200).json({ statusCode: 200, status: "successfull", facilityInfo })
            } catch (error) {
                res.status(400).json({ error: { statusCode: 400, status: "failed", message: error.message } })
            }
        }
    ]
}



module.exports = Controller;