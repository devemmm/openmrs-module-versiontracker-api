const jwt = require('jsonwebtoken')
const User = require('../module/User')

const requireAuth = (req, res, next) => {

    let { authorization } = req.headers

    try {
        if (!authorization) {
            authorization = req.body.authorization
            if (!authorization) {
                throw new Error('authorization token is null')
            }
        }

        const token = authorization.replace('Bearer ', "");

        jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {

            try {
                if (error) {
                    throw new Error("authorization token is invalid")
                }
                const user = await User.findByPk(payload.id)

                console.log(user.type)

                if (user.type !== "ADMIN") {
                    throw new Error("you are not allowed to access this data")
                }

                next()
            } catch (error) {
                res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message } })
            }
        })

    } catch (error) {
        res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message } })
    }
}

module.exports = { requireAuth }