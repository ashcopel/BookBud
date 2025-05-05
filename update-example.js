let {MongoClient} = require("mongodb")
uri = "mongodb://localhost:27017"
client = new MongoClient(uri)
async function run() {
    try {
        await client.connect();
        database = client.db("MGMT460")
        table    = database.collection("BookBud")
        where    = {userid:4}
        changes  = {$set:{bookname:"Dinosaurs",bookrating:3}}
        result   = await table.updateOne(where, changes)
        console.log(`# Records Modified: ${result.modifiedCount}`)
        } finally {
            await client.close()
        }
    }
    run().catch(console.dir)