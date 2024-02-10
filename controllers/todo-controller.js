const prisma = require('../models/db')

exports.getByUser = async (req,res,next) => {
    try {
        const data = await prisma.todo.findMany({
            where:{
                UserID : req.user.id
            }
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
}