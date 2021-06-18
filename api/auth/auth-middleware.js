const { findBy } = require("./auth-model")


const verifyPayload = (req, res, next) => {

    const { username, password = req.body } = req.body

    if (!username || !password || !username.trim() || !password.trim()) {
        res.status(400).json({
            message: "username and password required"
        })
    }

    else {
        next()
    }

}


const verifyUsenameFree = async (req, res, next) => {

    const { username } = req.body

    const user = await findBy({ username })

    if (user.length > 0) {
        res.status(422).json({ message: "username taken" })
    }

    else {
        next()
    }
}
const checkUsernameExist= async(req,res,next)=>{

    const { username } = req.body

    const user = await findBy({ username })

    if (user.length ===0) {
        res.status(401).json({ message: "invalid credentials" })
    }

    else {
        req.user=user
        next()
    }
}


module.exports = {
    verifyPayload,
    verifyUsenameFree,
    checkUsernameExist
}