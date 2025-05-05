let { MongoClient } = require("mongodb")
uri = "mongodb://localhost:27017"
client = new MongoClient(uri)
async function run() {
    try {
        await client.connect()
        database = client.db('MGMT460')
        table = database.collection('BookBud')
        query = { userid: 1 }
        row = await table.findOne(query)
        console.log(row)
    } finally {
        await client.close();
    }
}
run().catch(console.dir);