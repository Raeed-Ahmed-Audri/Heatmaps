import path from 'path';
import express from 'express';
import { getData } from './database.js';
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/apiCME7', async (req, res) => {
  var data = await getData("CME", "7");
  res.json(data);
})

app.get('/apiCME6', async (req, res) => {
  var data = await getData("CME", "6");
  res.json(data);
})

app.get('/apiCME5', async (req, res) => {
  var data = await getData("CME", "5");
  res.json(data);
})

app.get('/apiCME4', async (req, res) => {
  var data = await getData("CME", "4");
  res.json(data);
})

app.get('/apiDICE8A', async (req, res) => {
  var data = await getData("DICE", "8A");
  res.json(data);
})

app.get('/apiDICE8', async (req, res) => {
  var data = await getData("DICE", "8");
  res.json(data);
})

app.get('/apiETLC2', async (req, res) => {
  var data = await getData("ETLC", "E2");
  res.json(data);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

