import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope = ['https://www.googleapis.com/auth/spreadsheets']

# Add credentials to the account
creds = ServiceAccountCredentials.from_json_keyfile_name('Data\heatmaps-417802-4be522d666c8.json', scope)

client = gspread.authorize(creds)

spreadsheet_id = '1IIGyJwBnY5cvkyzs2-chTx-R-r4laxsm2gu3qHPGBkU'
spreadsheet = client.open_by_key(spreadsheet_id)

all_data = []

# Loop through each worksheet in the spreadsheet
for sheet in spreadsheet.worksheets():
    # Assuming room numbers are in Column D and utilizations are in Column E
    room_numbers = sheet.col_values(4)[1:]  # Skip the header
    utilizations = sheet.col_values(5)[1:]  # Skip the header

    # Get the title of the current sheet
    sheet_title = sheet.title

    # Combine the sheet title, room numbers, and utilizations into a list of tuples
    sheet_data = [(sheet_title, room_number, utilization) for room_number, utilization in zip(room_numbers, utilizations)]
    
    # Append the data from the current sheet to the main list
    all_data.extend(sheet_data)

# Do something with all_data, like printing it out or processing it further
print(all_data)


"""#####TEST LATER #######
conn = mysql.connector.connect(
    host='your_host',
    user='your_username',
    password='your_password',
    database='your_database_name'
)
cursor = conn.cursor()

# Assuming you have a table with the following schema:
# CREATE TABLE room_utilization (room_number VARCHAR(255), utilization_percent DECIMAL(10,2));

# Loop through each worksheet in the spreadsheet
for sheet in spreadsheet.worksheets():
    # Assuming room numbers are in Column D and utilizations are in Column E
    room_numbers = sheet.col_values(4)  # 4 corresponds to Column D
    utilizations = sheet.col_values(5)  # 5 corresponds to Column E
    
    
    sheet_data = list(zip(room_numbers[1:], utilizations[1:]))  # [1:] skips the header row
    
    # Insert data into the MySQL database
    for room_number, utilization_percent in sheet_data:
        cursor.execute('INSERT INTO room_utilization (room_number, utilization_percent) VALUES (%s, %s)',
                       (room_number, utilization_percent))

conn.commit()
cursor.close()
conn.close()

print('Data has been inserted into the MySQL database.')"""
