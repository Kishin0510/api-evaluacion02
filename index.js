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
    const collection = client.db("Product").collection("products");
    const products = await collection.find().toArray();
    res.json(products);
    await client.close();
});

app.post('/api/products', async (req, res) => {
    const newProduct = req.body;
    await client.connect();
    const collection = client.db("Product").collection("products");
    const result = await collection.insertOne(newProduct);
    res.json(result.ops);
    await client.close();
    console.log('Product added');
 });

app.put('/api/products/:id', async (req, res) => { 
    const productId = req.params.id;
    const updatedProduct = req.body;
    await client.connect();
    const collection = client.db("Product").collection("products");
    const result = await collection.updateOne({ _id: productId }, { $set: updatedProduct });
    res.json(result);
    await client.close();
    console.log('Product updated');
 });

app.delete('/api/products/:id', async (req, res) => { 
    const productId = req.params.id;
    await client.connect();
    const collection = client.db("Product").collection("products");
    const result = await collection.deleteOne({ _id: productId });
    res.json(result);
    await client.close();
    console.log('Product deleted');
 });

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
