// const express = require('express')
// const app = express()
// const port = 4000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

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
        const calenderTask = client.db('taskla').collection('indianTask');
        //get all data from mongodb
        app.get('/task', async (req, res) => {
            const alltask = await calenderTask.find().toArray()
            res.send(alltask)
        })
        //send mongodb data
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
    res.send('calendar-app-appointment')
})


app.listen(port, () => {
    console.log('starting express', port)
})