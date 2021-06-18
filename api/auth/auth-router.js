//required libraries
const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

//required files
const users=require("./auth-model")//model
const{verifyPayload,verifyUsenameFree,checkUsernameExist}= require("./auth-middleware")//middleware
const buildToken = require("../helpers/buildToken")//token bulder func

//endpoints
///register
router.post('/register', verifyPayload,verifyUsenameFree,async (req, res,next) => {
  const {username,password} = req.body//destructuring

const hash = await bcrypt.hash(password,8)//hashing with bcrypt

users.add({username,password:hash})//adds user to db
.then(user=>{
const[returnUser] = user
  res.status(201).json(returnUser)//response
})
.catch(next)//error

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.
    DO NOT EXCEED 2^8 ROUNDS OF HASHING!

    1- In order to register a new account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel", // must not exist already in the `users` table
        "password": "foobar"          // needs to be hashed before it's saved
      }

    2- On SUCCESSFUL registration,
      the response body should have `id`, `username` and `password`:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- On FAILED registration due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED registration due to the `username` being taken,
      the response body should include a string exactly as follows: "username taken".
  */
});

router.post('/login',verifyPayload,checkUsernameExist, (req, res) => {
const{password}=req.body//password from req
const [user]=req.user// db user obj
const hash = user.password// db user hash

const compare = bcrypt.compareSync(password,hash)// returns true or false based on sync compare of hash and password from req

if(compare===true){
const token = buildToken(user)//imported helper function creating a user token

res.json({
message:`welcome, ${user.username}`,// sent to user only if password is valid
token//newly created json Web Token
})
}

else{
res.status(401).json({message:"invalid credentials"})
}

  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
