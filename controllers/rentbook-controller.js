const prisma = require('../models/db')

exports.getByUser = async (req,res,next) => {
    try {
        const data = await prisma.rentBook.findMany({
            where:{
                UserID : req.user.id
            }
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.getByAdmin = async (req,res,next) => {
    try {
        const data = await prisma.rentBook.findMany({})
        res.json(data)
    } catch (err) {
        next(err)
    }
}