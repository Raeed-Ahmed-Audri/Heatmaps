import express from 'express';
import { getData } from './database.js';
const app = express();
const port = 3000;

//Use files in "public" folder for the application.
app.use(express.static('public'));

//Get API data for CME 7th floor.
app.get('/apiCME7', async (req, res) => {
  var data = await getData("CME", "7");
  res.json(data);
})

//Get API data for CME 6th floor.
app.get('/apiCME6', async (req, res) => {
  var data = await getData("CME", "6");
  res.json(data);
})

//Get API data for CME 5th floor.
app.get('/apiCME5', async (req, res) => {
  var data = await getData("CME", "5");
  res.json(data);
})

//Get API data for CME 4th floor.
app.get('/apiCME4', async (req, res) => {
  var data = await getData("CME", "4");
  res.json(data);
})

//Get API data for CME 3rd floor.
app.get('/apiCME3', async (req, res) => {
  var data = await getData("CME", "3");
  res.json(data);
})

//Get API data for DICE floor 8A.
app.get('/apiDICE8A', async (req, res) => {
  var data = await getData("DICE", "8A");
  res.json(data);
})

//Get API data for DICE 8th floor.
app.get('/apiDICE8', async (req, res) => {
  var data = await getData("DICE", "8");
  res.json(data);
})

//Get API data for ETLC 2nd floor.
app.get('/apiETLC2', async (req, res) => {
  var data = await getData("ETLC", "E2");
  res.json(data);
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

