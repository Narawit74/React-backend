const jwt = require("jsonwebtoken")
const prisma = require("../models/db")

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization
        if (!authorization) {
            throw new Error("Unauthorized")
        }
        if (!(authorization.startsWith('Bearer'))) {
            throw new Error("Unauthorized")
        }
        const token = authorization.split(' ')
        const payload = jwt.verify(token[1], process.env.JWT_SECRET_KEY)

        const user = await prisma.user.findFirstOrThrow({
            where: {
                id: payload.id,
              role: Number(99)
            }
        })
        req.user = user

        next()
    } catch (err) {
        next(err)
    }

}