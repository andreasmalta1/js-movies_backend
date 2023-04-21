import app from "./server.js"
import mongodb from "mongodb"
import * as dotenv from 'dotenv'
dotenv.config()

// import reviewDAO from "/dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env["MONGO_USERNAME"]
const password = process.env.PASSWORD

console.log(mongo_username)
console.log("22")

const uri = `mongodb+srv://${mongo_username}:${password}@cluster0.spo2izp.mongodb.net/?retryWrites=true&w=majority`
const port = 8000

console.log(mongo_username)
console.log(password)


MongoClient.connect(uri, 
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})