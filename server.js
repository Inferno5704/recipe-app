const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const path=require('path');
const app = express();
const PORT = 4000;

// MongoDB Connection
const uri = process.env.MONGO_URI || "your_mongo_uri_here";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(cors({
  origin: 'http://localhost:4000',
  methods: 'GET,POST,PUT,DELETE',
}));
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// MongoDB Database Reference
let db;
client.connect()
  .then(() => {
    db = client.db("recipe");
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes
app.post('/api/recipes', async (req, res) => {
  try {
    const newRecipe = req.body;
    const result = await db.collection("recipe").insertOne(newRecipe);
    console.log('Recipe created:', result.ops[0]);
    res.status(201).send(result.ops[0]);
  } catch (error) {
    console.error('Error saving recipe:', error);
    res.status(400).send(error);
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await db.collection("recipe").find().toArray();
    console.log('Fetched recipes:', recipes);
    res.status(200).send(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send(error);
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  try {
    const recipe = await db.collection("recipe").findOne({ _id: new ObjectId(req.params.id) });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    console.log('Fetched recipe by ID:', recipe);
    res.json(recipe);
  } catch (err) {
    console.error('Error fetching recipe by ID:', err);
    res.status(500).json({ message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
