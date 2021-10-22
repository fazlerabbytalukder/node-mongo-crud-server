const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;

//middleware sob smy app er niche dite hbe na hole kaj korbe na
app.use(cors());
app.use(express.json())

//uder: mybduser1
//pass: HeHPXHwtnX5CysZH


const uri = "mongodb+srv://mybduser1:HeHPXHwtnX5CysZH@cluster0.cnnr8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        const database = client.db("foodmaster");
        const usersCollection = database.collection("users");
        //get api
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            console.log('lode user with id',user);
            res.send(user)
        })
        //POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser)
            console.log('got new user',req.body);
            console.log('added user',result);
            res.json(result);
        })
        //delete API
        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log('deleting with id', result);
            res.json(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);
































app.get('/', (req, res) => {
    res.send('running my crud server');
})
















app.listen(port, () => {
    console.log('running server on port', port);
})