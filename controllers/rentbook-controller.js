const prisma = require('../models/db')

exports.getByUser = async (req, res, next) => {
    try {
        const data = await prisma.rentBook.findMany({
            where: {
                UserID: req.user.id
            }
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.getByAdmin = async (req, res, next) => {
    try {
        const data = await prisma.rentBook.findMany({
            
        })
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.getRentBookByID = async (req, res, next) => {
    try {
        const { id } = req.params;

        const RentDataID = await prisma.rentBook.findFirst({
            where :{
                id:Number(id)
            }
        })
        if (!RentDataID) {
            return res.status(404).json({ message: "The requested item does not exist." });
        }

        console.log(RentDataID);
        res.json({ RentDataID });
    } catch (err) {
        next(err);
    }
};

exports.createNewRentbook = async (req, res, next) => {
    const { title, status, userID, Image, duedate } = req.body
    try {
        const RentBook = {
            Title: title,
            img: Image,
            Duedate:new Date (duedate),
            Status: status,
            UserID: Number(userID)
        }
        // console.log(RentBook)
        const rs = await prisma.rentBook.create({
            data: RentBook
        })

        res.status(201).json({ message: `Successfully Created new book`, rs})

    } catch (err) {
        next(err)
    }
}

exports.deleteRentBook = async(req,res,next) =>{
    const { id } = req.params
    try {
        if(isNaN(id)){
            return res.status(400).json({message : "please input id"})
        }
        const data = await prisma.rentBook.findFirst({
            where : {
                id : Number(id)
            }
        })
        if(!data){
            return res.status(404).json({message : `Can't find product with id ${id}`})
        }
        await prisma.rentBook.delete({
            where:{
                id : Number(id)
            }
        })
        res.json({message : `Successfully delete rentbook id ${id}`})
    } catch (err) {
        next(err)
    }
}

exports.updateRentBook = async (req, res, next) => {
    const { title, img, duedate, status } = req.body;
    const { id } = req.params;

    try {
        if(isNaN(id)){
            return res.status(400).json({message : "please input id"})
        }
        let data = await prisma.rentBook.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!data) {
            return res.status(404).json({ message: `rentbook with id ${id} does not exist` });
        }

        let rentBookData = {};

        if(title !== undefined && title !== data.Title){
            rentBookData.Title = title
        }
        if (img !== undefined && img !== data.img) {
            rentBookData.img = img
        }
        if (duedate !== undefined && duedate !== data.Duedate) {
            rentBookData.Duedate = new Date(duedate);
        }
        if (status === "DOING" || status === "PENDING" || status === "DONE" && status !== data.Status) {
            rentBookData.Status = status;
        }

        if (Object.keys(rentBookData).length > 0) {
            await prisma.rentBook.update({
                where: {
                    id: Number(id)
                },
                data: rentBookData
            });
        }

        res.json({ message: `Successfully updated product with id ${id}` });
    } catch (err) {
        next(err);
    }
};

exports.getByAdminSearch = async (req, res, next) => {
    try {
        const { text } = req.query
        // console.log(text)
        const querytirm = text.trim()
        if (querytirm.length === 0) {
            return res.status(405).json({ message: "please fill input" })
        }
        const RentData = await prisma.rentBook.findMany({
            where: {
                OR: [
                    {
                        Title: {
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

