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
        const data = await prisma.rentBook.findMany({})
        res.json(data)
    } catch (err) {
        next(err)
    }
}

exports.getRentBookByID = async (req, res, next) => {
    try {
        const { id } = req.query;

        const RentDataID = await prisma.$queryRaw`SELECT * FROM rentbook WHERE id = ${id}`;
        if (RentDataID.length === 0) {
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
        console.log(RentBook)
        const rs = await prisma.rentBook.create({
            data: RentBook
        })

        res.status(201).json({ message: `Successfully Created new book`, rs})

    } catch (err) {
        next(err)
    }
}

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

