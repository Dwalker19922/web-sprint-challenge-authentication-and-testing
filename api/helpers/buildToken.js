const jwt = require("jsonwebtoken")
const { SECRET } = require("../secrets/index");
const buildToken = (user) => {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: "1d"
    }
    return jwt.sign(payload, SECRET, options)
}
module.exports=buildToken