import mysql from 'mysql2';
import dotenv from 'dotenv';
//Ensure use of .env file.
dotenv.config();

//Create a pool of connections using the encryption data in the .env file.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).promise();

//Asynchronous function that sends an SQL query on the SQL database when asked by the website application.
//Takes the building name and floor number as input, and returns the SQL rows regarding the building and floor.
export async function getData(building, floor) {
  //Special case for ETLC and ECERF (all floors start with E and W respectively), basement floors (P and L floors), and the DICE 8A floor.
  if (floor.charAt(0) == "E" || floor.charAt(0) == "W" || floor.charAt(0) == "P" || floor.charAt(0) == "L" || floor.charAt(1) == "A") {
    const [rows] = await pool.query("SELECT * FROM room_utilization WHERE building = ? AND LEFT(room_number, 2) = ?", [building, floor]);
    return rows;
  } else {
    //Otherwise, grab all rows based on number only.
    const [rows] = await pool.query("SELECT * FROM room_utilization WHERE building = ? AND LEFT(room_number, 2) = CONCAT(?, '-')", [building, floor]);
    return rows;
  }
}