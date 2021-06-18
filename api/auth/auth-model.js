const db =require('../../data/dbConfig')

const add=async(user)=>{
 const [id] =await db("users").insert(user)

 return await findBy({id})//returns requested info
}

const findBy = (id)=>{
    return db("users").where(id) // allows for any search param
}

module.exports ={
    add,findBy
}