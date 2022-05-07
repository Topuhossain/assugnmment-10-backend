const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const ObjectId=require('mongodb').ObjectId

const cors = require('cors')
require('dotenv').config()



app.use(cors());

// it use for when give data from body it cant parse it
app.use(express.json())



const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectID } = require('bson');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7qgfd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const serviceCOllection = client.db('photography').collection('services')

        //get all date collect from database

        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCOllection.find(query)
            const service = await cursor.toArray()
            res.send(service)
        })


       // for a specific id

       app.get('/services/:id',async(req,res)=>{
           const id= req.params.id;
           const query = {_id:ObjectId(id)}

           const service =await serviceCOllection.findOne(query)
           res.send(service)
       })

    //    insert a single  document

    app.post('/services',async(req,res)=>{
        const newService = req.body
        const result =await serviceCOllection.insertOne(newService)
        res.send(result)
    })

    // delete one 

    app.delete('/services/:id',async(req,res)=>{
        const id = req.params.id
        const query ={_id:ObjectID(id)}
        const result =await serviceCOllection.deleteOne(query)
        res.send(result)
    })


    }
    finally {

    }

}
run().catch(console.dir)






app.get('/', (req, res) => {
    res.send('this is my photography page')
})


app.listen(port, () => {
    console.log('the port is running', port);
})




