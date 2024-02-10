const prisma = require('../models/db')

exports.getByUser = async (req, res, next) => {
    try {
        const data = await prisma.user.findFirst({
            where: {
                id: req.user.id
            }
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
}