const { findBy } = require("./auth-model")

const verifyPayload = (req, res, next) => {

    const { username, password = req.body } = req.body

    if (!username || !password || !username.trim() || !password.trim()) { //checking body has required paramaters
        res.status(400).json({
            message: "username and password required" ///if fail
        })
    }

    else {
        next()//if pass
    }

}


const verifyUsenameFree = async (req, res, next) => {

    const { username } = req.body

    const user = await findBy({ username })

    if (user.length > 0) {//checking return value is a empty array
        res.status(422).json({ message: "username taken" })///fail
    }

    else {
        next()//pass
    }
}

const checkUsernameExist= async(req,res,next)=>{

    const { username } = req.body

    const user = await findBy({ username })

    if (user.length ===0) {/// checking is not an empty array and making sure name is unique
        res.status(401).json({ message: "invalid credentials" })//fail
    }

    else {
        req.user=user//setting req.user for future purpose
        next()//pass
    }
}


module.exports = {
    verifyPayload,
    verifyUsenameFree,
    checkUsernameExist
}