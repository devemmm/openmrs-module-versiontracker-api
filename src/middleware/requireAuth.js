const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next)=>{

    const { authorization } = req.headers

    try {
        if(!authorization){
            throw new Error('authorization token is null')
        }

        const token = authorization.replace('Bearer ', "");

        jwt.verify(token, process.env.JWT_SECRET, async(error, payload)=>{

            try {
                if(error){
                    throw new Error("authorization token is invalid")
                }
                
                next()
            } catch (error) {
                res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message} })
            }
        })

    } catch (error) {
        res.status(401).json({ error: { statusCode: 401, status: "failed", message: error.message} })
    }
}

module.exports = { requireAuth }