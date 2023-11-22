const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const secretKey = process.env.JWT_SECRET_KEY;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nicolas:FpKIfHfxMz9p2oki@cluster0.tunfkso.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
async function run() {
    try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (err) {
    console.log(err);
   }
 }
run().catch(console.dir);

const products = [];

// Add your routes here
app.get('/api/products', async (req, res) => {
    await client.connect();
    res.json(products);
});

app.get('/users', async (req, res) => {
  await client.connect();
  const collection = client.db("Dumbo").collection("users");
  const users = await collection.find().toArray();
  res.json(users);
  await client.close();
  })

app.post('/users', async (req, res) => {
  const newUser = req.body;
  const hashedPassword = await bcrypt.hash(newUser.password, 10);
  newUser.password = hashedPassword;
  await client.connect();
  const collection = client.db("Dumbo").collection("users");
  const result = await collection.insertOne(newUser);
  res.json(result.ops);
  await client.close();
  console.log('User added');
 });

 app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);
    res.json(user);
    console.log('User found: ',user.value.name);
 });

 app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex(u => u.id === userId);
    users.splice(userIndex, 1);
    console.log('User deleted');
 });
// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
