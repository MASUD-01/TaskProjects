const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//middelware
app.use(cors());
app.use(express.json());
const uri = "mongodb+srv://taskla:dAKGb6kYJLfMjHHj@cluster0.k7x5vob.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const calenderTask = client.db('taskla').collection('TaskProjects');

        app.get('/task', async (req, res) => {
            const alltask = await calenderTask.find().toArray()
            res.send(alltask)
        })
        app.post('/task', async (req, res) => {
            const state = req.body;
            console.log(state);
            const allTask = state;
            const result = await calenderTask.insertOne(allTask);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('TaskProject')
})


app.listen(port, () => {
    console.log('starting express', port)
})