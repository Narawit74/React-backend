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

exports.getByAdminSearch = async (req,res,next) => {
    try {
        const { text } = req.query
        // console.log(text)
        const querytirm = text.trim()
        if(querytirm.length === 0){
            return res.status(405).json({message:"please fill input"})
        }
        const productData = await prisma.rentBook.findMany({
            where : {
                OR : [
                    {
                        Title: {
                            contains : querytirm
                        }
                    }
                ]
            }
        })
        if (productData.length === 0) {
            return res.status(404).json({ message: "No match item" });
        }
        
        // console.log(productData)
    res.json({ productData })
        
    } catch (err) {
        next(err)
    }
}

