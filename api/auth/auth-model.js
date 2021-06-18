const db =require('../../data/dbConfig')

const add=async(user)=>{
 const [id] =await db("users").insert(user)
 return await findById(id)
}

const findById = (id)=>{
    return db("users").where("id",id)
}
module.exports ={
    add,findById
}