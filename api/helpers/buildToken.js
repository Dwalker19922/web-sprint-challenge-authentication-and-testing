const jwt = require("jsonwebtoken")
const { SECRET } = require("../secrets/index");//imports secret

const buildToken = (user) => {
    const payload = {//payload obh
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1d"//sets expiration
    }
    return jwt.sign(payload, SECRET, options)//builds token
}

module.exports=buildToken