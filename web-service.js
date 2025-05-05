let { MongoClient } = require("mongodb")
let uri = "mongodb+srv://alcopeland2003:Password1@cluster44.ebw8cdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster44"
let client = new MongoClient(uri)

let express = require("express")
let path    = require("path")

let app  = express()
let port = 4444

app.use(express.static("www"))
app.use(express.json())

app.listen(port, function() {
    console.log(`Full-stack app is listening on port ${port}`)
})

app.get("/helloworld", function (req, res) {
    res.send("Hello World: Ashley!")
})

app.get("/retrieve", function (req, res) {
    async function run() {
        try {
            await client.connect()
            database = client.db ('MGMT460')
            table    = database.collection('BookBud')
            query    = {}
            rows = await table.find(query)
            res.send(JSON.stringify(await rows.toArray()))
        } finally {
          await client.close()
        }
    }
    run()
})

app.get("/retrieve-one/:userid", function(req, res) {
    async function run() {
        try {
          await client.connect()
          database = client.db('MGMT460')
          table = database.collection('BookBud')
          query = { userid: parseInt(req.params.userid) }
          row = await table.findOne(query)
          res.send(JSON.stringify(row))
        } finally {
          await client.close()
        }
      }
      run()
})

app.post("/create", function (req, res) {
    async function run() {
        try {
            await client.connect()
            const database = client.db("MGMT460")
            const table    = database.collection("BookBud")
            const record   = {
                userid      : parseInt(req.body.userid),
                bookname    : req.body.bookname,
                bookrating  : parseInt(req.body.bookrating),
                bookcomment : req.body.bookcomment,
                startdate   : new Date(req.body.startdate),
                enddate     : new Date(req.body.enddate),
                bookgenre   : req.body.bookgenre
            }
            const result = await table.insertOne(record)
            res.status(201).json({ message: "Record created", id: result.insertedId })
        } catch (err) {
            console.error("Error in /create:", err)
            res.status(500).send("Failed to create entry")
        } finally {
            await client.close()
        }
    }
    run()
})


app.delete("/delete/:userid", function(req, res) {
    async function run() {
        try {
            await client.connect()
            database = client.db("MGMT460")
            table    = database.collection("BookBud")
            query    = { userid: parseInt(req.params.userid) }
            result   = await table.deleteOne(query)
        } finally {
            await client.close()
        }
    }
    run()
})

app.put("/update", function(req, res) {
    async function run() {
        try {
            await client.connect()
            database  = client.db("MGMT460")
            table     = database.collection("BookBud")
            where     = {userid: parseInt(req.body.userid)}
            changes   = {$set:{
                bookname     : req.body.bookname,
                bookrating   : parseInt(req.body.bookrating),
                bookgenre    : req.body.bookgenre,
                bookcomment  : req.body.bookcomment}}
            result    = await table.updateOne(where, changes)
        } finally {
            await client.close()
        }
    }
    run()
})