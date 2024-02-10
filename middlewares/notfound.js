const notFoundHandler = (req,res,next) => {
    res.status(404).json({message:"path you request is not found on server"})
}

module.exports = notFoundHandler