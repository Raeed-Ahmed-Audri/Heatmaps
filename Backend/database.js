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
  if (floor.charAt(0) == "E" || floor.charAt(0) == "W" || floor.charAt(0) == "P" || floor.charAt(0) == "L" || floor.charAt(1) == "A") {
    const [rows] = await pool.query("SELECT * FROM room_utilization WHERE building = ? AND LEFT(room_number, 2) = ?", [building, floor]);
    return rows;
  } else {
    const [rows] = await pool.query("SELECT * FROM room_utilization WHERE building = ? AND LEFT(room_number, 2) = CONCAT(?, '-')", [building, floor]);
    return rows;
  }
}