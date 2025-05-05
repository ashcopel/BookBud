let {MongoClient} = require("mongodb")
uri = "mongodb://localhost:27017"
client = new MongoClient(uri)
async function run() {
    try {
        await client.connect();
        database = client.db("MGMT460")
        table    = database.collection("BookBud")
        record   = {
            userid      : 3,
            bookname    : "Test Book",
            bookrating  : 1,
            bookcomment : "Not my favorite book!",
            startdate   : new Date(),
            enddate     : new Date(),
            bookgenre   : "Romance"
        }
        result = await table.insertOne(record)
        console.log(`Record_id: ${result.InsertedID} inserted!`)
    } finally {
        await client.close()
    }
}
run().catch(console.dir)