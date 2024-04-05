import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}).promise();

export async function getData(building, floor) {
    const [rows] = await pool.query("SELECT * FROM room_utilization WHERE building = ? AND LEFT(room_number, 1) = ?", [building, floor]);
    return rows;
}

/*
// Connect to MySQL
connection.connect(error => {
if (error) throw error;
console.log("Successfully connected to the database.");
connection.query("SELECT * FROM room_utilization WHERE building = 'CME' AND LEFT(room_number, 1) = '7'", function (error, result, fields) {
  if (error) throw error;
  console.log(result)
});
});
*/