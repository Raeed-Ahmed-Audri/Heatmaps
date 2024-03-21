import gspread
from oauth2client.service_account import ServiceAccountCredentials
import mysql.connector

# Google Sheets API setup
scope = ['https://www.googleapis.com/auth/spreadsheets']
creds = ServiceAccountCredentials.from_json_keyfile_name('Data\heatmaps-417802-4be522d666c8.json', scope)
client = gspread.authorize(creds)
spreadsheet_id = '1IIGyJwBnY5cvkyzs2-chTx-R-r4laxsm2gu3qHPGBkU'
spreadsheet = client.open_by_key(spreadsheet_id)

all_data = []

# Fetch data from each worksheet in the Google Spreadsheet
for sheet in spreadsheet.worksheets():
    room_numbers = sheet.col_values(4)[1:]  # Skip the header
    utilizations = sheet.col_values(5)[1:]  # Skip the header
    sheet_title = sheet.title
    sheet_data = [(sheet_title, room_number, utilization) for room_number, utilization in zip(room_numbers, utilizations)]
    all_data.extend(sheet_data)

# MySQL connection setup
conn = mysql.connector.connect(
    host='localhost',  # or your MySQL server host
    user='root',  # your MySQL username
    password='Gooball123',  # your MySQL password
    database='heatmaps'  # your MySQL database name
)
cursor = conn.cursor()

# SQL statement for inserting data, with handling for duplicate primary key entries
insert_stmt = """
INSERT INTO room_utilization (building, room_number, utilization_percent) 
VALUES (%s, %s, %s) 
ON DUPLICATE KEY UPDATE utilization_percent = VALUES(utilization_percent);
"""

# Insert fetched data into the MySQL database
for data in all_data:
    cursor.execute(insert_stmt, data)

conn.commit()

# Cleanup
cursor.close()
conn.close()

print('Data has been inserted into the MySQL database.')


