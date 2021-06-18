const db =require('../../data/dbConfig')

const add=async(user)=>{
 const [id] =await db("users").insert(user)
 console.log(id)
 return await findBy({id})
}

const findBy = (id)=>{
    return db("users").where(id)
}
module.exports ={
    add,findBy
}