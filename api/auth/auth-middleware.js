const {findBy} = require("./auth-model")
const verifyPayload=(req,res,next) => {
    const{username,password=req.body} =req.body
if(!username||!password||!username.trim()||!password.trim()){
res.status(400).json({
    message:"username and password required"
})
}
else{
next()
}
}
module.exports ={
    verifyPayload
}