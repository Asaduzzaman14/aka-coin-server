const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())



// aka-coin
// TdrHVgY6udywdrt8


const uri = "mongodb+srv://aka-coin:TdrHVgY6udywdrt8@cluster0.dzz2hu7.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    client.connect()

    // client.connect(err => {
    //     const collection = client.db("test").collection("devices");
    //     // perform actions on the collection object
    //     console.log('database connected');
    //     client.close();
    // });


    const coinCollection = client.db("aka-coins").collection("coin");
    const walletCollection = client.db("aka-coins").collection("wallet");


    //  get coins
    app.get('/coins', async (req, res) => {
        const coin = await coinCollection.find().toArray()
        res.send(coin)
    })

    //  delete coin
    app.delete('/deleteCoin/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const filter = { _id: ObjectId(id) }
        const result = await coinCollection.deleteOne(filter)
        res.send(result)
    })

    // add coin
    app.post('/coin', async (req, res) => {
        const coin = req.body;
        const result = await coinCollection.insertOne(coin);
        res.send(result);

    })

    // add wallet
    app.post('/wallet', async (req, res) => {
        const tool = req.body;
        const result = await walletCollection.insertOne(tool);
        res.send(result);

    })

    // get wallets
    app.get('/wallets', async (req, res) => {
        const coin = await walletCollection.find().toArray()
        res.send(coin)
    })






}

run().catch(console.dir())


app.get('/', (req, res) => {
    res.send('aka is run')
})

app.listen(port, () => {
    console.log(`aka  lisining is ${port}`);
})