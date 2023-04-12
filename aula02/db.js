const ObjectId = require("mongodb").ObjectId
const { MongoClient } = require("mongodb")

async function connectDataBase(){
    if(!global.connection){
        try {
            const client = new MongoClient(process.env.MONGODB_CONNECTION)  //Será criado uma configuração conexão de client
            await client.connect()  //Realiza a conexão
            global.connection = client.db("teste")  //Após conectar ao servidor, será connectado ao banco de dados "teste". Foi atribuído para uma variável global para fins didáticos
            console.log("Connected to mongodb")
        } catch (error) {
            console.log(error)
            global.collection = null;
        }
    }
}

connectDataBase()

//CRUD
function insertCustomer(customer){
    return global.connection
                 .collection("clientes")
                 .insertOne(customer)
}

function findCustomers(){
    return global.connection.collection("clientes").find({}).toArray()
}

function findCustomer(id){
    const objectId = new ObjectId(id)
    return global.connection
                 .collection("clientes")
                 .findOne({_id: objectId})
}

function updateCustomer(id, customer){
    const objectId = new ObjectId(id) //O id deverá ser convertido para um ObjectId, que é a forma armazenada no Mongo
    return global.connection
                 .collection("clientes")
                 .updateOne({_id: objectId}, {$set: customer}) //O primeiro parâmetro é um objeto com o filtro. O segundo é um objeto com o que será alterado..
}

function deleteCustomer(id){
    const objectId = new ObjectId(id) //O id deverá ser convertido para um ObjectId, que é a forma armazenada no Mongo
    return global.connection
                 .collection("clientes")
                 .deleteOne({_id: objectId})
}

module.exports = {
    findCustomers,
    findCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}