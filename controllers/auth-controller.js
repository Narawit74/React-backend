const bcrypt = require("bcryptjs")
const prisma = require("../models/db")
const jwt = require("jsonwebtoken")

exports.register = async (req,res,next) => {
    try {
    const {username, password, confirmPassword, email} = req.body
    //validation
    if( !(username.trim() && password && confirmPassword) ) {
        return next( new Error(`Fulfill all inputs`))
    }
    if( (password !== confirmPassword )){
        throw new Error(`Confirm password not match`)
    }

    const hashedPassword = await bcrypt.hash(password,8)

    const data = {
        Username:username,
        display:username,
        Password: hashedPassword,
        Email:email 
    }
    await prisma.user.create({ // insert to database
        data : data
    })
    
    res.send("in register...")
    // res.json({ data })
    } catch (err) {
        next(err)
    }
    
}
exports.login = async (req,res,next) => {
    const { username , password } = req.body;
    try {
        if( !(username.trim() && password.trim())){
            throw new Error("Please Fill Input")
        }
        const user = await prisma.user.findFirstOrThrow({
            where:{
                Username:username
            }
        })
        const pwOk = await bcrypt.compare(password,user.Password)
        if(!pwOk) {
            throw new Error('invalid login')
        }
        const payload = { id: user.id, role: user.role }
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY,{
            expiresIn: '10d'
        })
        res.json({token : token})
    } catch (err) {
        console.log(err.message)
        next(err)
    }
    //
    
}
exports.updateUser = async (req,res,next) =>{
    const { oldPassword, newPassword ,confirmNewPassword, displayname, email, profilepicture } = req.body
    const uid = req.user.id
    try {
        if( newPassword && newPassword !== confirmNewPassword ){
            throw new Error(`New password not match`)
        }
        if( newPassword && !oldPassword ){
            throw new Error(`Please input oldpassword`)
        }

        const data = await prisma.user.findFirst({
            where : {
                id : uid
            }
        })
        delete data.Backend

        let userData = {
            Password: data.Password,
            display: data.display,
            Email: data.Email,
            avatar: data.avatar
        }

        if(newPassword){
            const pkCheck = await bcrypt.compare(oldPassword,data.Password)
            if(!pkCheck){
                throw new Error(`Invaild Password`)
            }
            const newpasshashed = await bcrypt.hash(newPassword,8)
            userData.Password = newpasshashed
        }
        if(displayname){
            userData.display = displayname
        }
        if(email){
            userData.Email = email
        }
        if(profilepicture){
            userData.avatar = profilepicture
        }
        // console.log(userData)

        await prisma.user.update({
            where : {
                id : uid
            },
            data : userData
        })
        res.json({message : `อัปเดตชื่อผู้ใช้งาน ${data.display} สำเร็จแล้ว `})
    } catch (err) {
        next(err)
    }
}

exports.getMe = (req,res,next) => {
    res.json(req.user)
}