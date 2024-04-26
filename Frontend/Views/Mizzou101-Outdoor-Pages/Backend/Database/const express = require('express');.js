//dependencies
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
//express port and mongo connection string
const app = express();
const PORT = process.env.PORT || 3000;
const database_connection = process.env.MONGODB_URI;
app.use(cors());
app.use(bodyParser.json());

// database connection
let db;
MongoClient.connect(database_connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db('Mizzou101');
    console.log('Connected to database');
  })
  .catch((err) => console.error('Error connecting to database:', err));


// api to retreive information from specified collection
app.get('/api/data/:collection', async (req, res) => {
  try {
    const { collection } = req.params;
    const data = await db.collection(collection).find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving data', error: err });
  }
});

// api to update data in specified collection
app.put('/api/data/:collection/:id', async (req, res) => {
  try {
    const { collection, id } = req.params;
    const updatedData = req.body;
    const result = await db
      .collection(collection)
      .updateOne({ _id: ObjectId(id) }, { $set: updatedData });
    res.json({ message: 'Data updated successfully', modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ message: 'Error updating data', error: err });
  }
});

const options = {
  key: fs.readFileSync('/home/ec2-user/key.pem', 'utf8'),
  cert: fs.readFileSync('/home/ec2-user/cert.pem', 'utf8'),
  passphrase: 'Arx457Hm',
  rejectUnauthorized: false
};

const server = https.createServer(options, app);
// start the app
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});