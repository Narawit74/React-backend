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

exports.getUsers = async (req, res, next) => {
    try {
        const data = await prisma.user.findMany({
            
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.getUsersSearch = async (req, res, next) => {
    try {
        const { text } = req.query
        // console.log(text)
        const querytirm = text.trim()
        if (querytirm.length === 0) {
            return res.status(405).json({ message: "please fill input" })
        }
        const RentData = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        display: {
                            contains: querytirm
                        }
                    }
                ]
            }
        })
        if (RentData.length === 0) {
            return res.status(404).json({ message: "No match item" });
        }

        // console.log(RentData)
        res.json({ RentData })

    } catch (err) {
        next(err)
    }
}

exports.deleteUsers = async(req,res,next) =>{
    const { id } = req.params
    try {
        if(isNaN(id)){
            return res.status(400).json({message : "please input id"})
        }
        const data = await prisma.user.findFirst({
            where : {
                id : Number(id)
            }
        })
        if(!data){
            return res.status(404).json({message : `Can't find product with id ${id}`})
        }
        await prisma.user.delete({
            where:{
                id : Number(id)
            }
        })
        res.json({message : `Successfully delete rentbook id ${id}`})
    } catch (err) {
        next(err)
    }
}