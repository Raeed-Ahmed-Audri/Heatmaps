# Heatmaps
In many educational and corporate settings, efficiently managing and utilizing space is key to accommodating diverse activities and maximizing resources. However, traditional methods of assessing room utilization often rely on static data and generic metrics that don't always reflect the specific needs or usage patterns of the organization.

The Heatmaps project was developed to address this gap by providing an interactive, real-time visualization of space utilization across various rooms and facilities. The core motivation behind this project is to enable our team to visualize and analyze room usage based on our own tailored metrics, which are more aligned with our specific operational goals and challenges.

This project leverages advanced web technologies and database management systems to create a dynamic platform where utilization data is not only displayed in an intuitive heatmap format but is also interactive. Users can drill down into specific details for each room, adjust parameters, and view real-time updates based on the latest data. This level of interaction and customization allows for more informed decision-making, enabling efficient use of spaces and resources.

Furthermore, by developing this project, we aim to set a foundation for future enhancements such as integrating more granular data points, incorporating predictive analytics for space planning, and expanding the scope to include additional buildings or even remote locations. Our goal is to create a tool that not only serves our current needs but also adapts to future demands and technologies.

Ultimately, the Heatmaps project represents a step forward in how we understand and optimize space utilization, turning static data into actionable insights that can lead to more strategic and effective management of our facilities.

# Heatmaps Project Installation Instructions

## Introduction
This README provides detailed setup instructions for the Heatmaps project. Please follow the steps carefully to ensure proper setup.

## Front End Installation
You will need basic Front-End Dev Tools like HTML, CSS, and JS. Here are the recommended extensions if using VSCode:

1. HTML CSS Support
2. JS installation
3. HTML Boilerplater
4. IntelliSense for CSS class names in HTML
5. Live Preview

## Working with the Database
The project requires Python, MySQL, and JavaScript (Node.js) for database management. Here are the steps to set up the environment:

### Python Setup
- Install Python and set up the environment. Refer to this [YouTube tutorial](https://www.youtube.com/watch?v=9o4gDQvVkLU).
- Use the following command to install necessary packages: 
        pip install gspread oauth2client mysql-connector-python python-dotenv

### API Key Access
- The API Key is available in the GitHub repository after pulling from GIT.
- For creating and managing Google Sheets API keys, refer to [Google Cloud Services](https://console.cloud.google.com/welcome?project=heatmaps-417802).

### MySQL Setup
1. Install MySQL from [this link](https://dev.mysql.com/downloads/mysql/). Use version 8.3.0 or any future version.
2. Follow the MySQL Configurator steps, particularly noting the port number and root password.
3. Take note of the following
    a) In Type and Networking, take note of the Port Number and X Protocol Port Number, the defaults are 3306 and 33060 respectively. If the numbers are different that is fine, you can either change them to the default or just write them down somewhere for later         
       reference.
    b) In Accounts and Roles, write down the password you select for the root user. This user will let you access the SQL server with username “root” and the password being whatever you chose.
    c) In Apply Configuration, make sure to hit execute before proceeding.To ensure MySQL installed correctly, in the Windows Start Menu, type “mysql” and you should find “MySQL 8.3 Command Line Client” as an application. If you open it, you will be prompted with a     
       password. If you give it the password you specified, you should be able to log in.
4. After logging into MySQL like in 2c, run the following command, case sensitive:
            CREATE DATABASE heatmaps;
   If done correctly, the window should output “Query OK, 1 row affected” with some elapsed time beside it. To ensure the database is in the server, run the command:
            SHOW DATABASES;

## Back-End and VSCODE-SQL Server Connection Setup
1. Install SQLTools and SQLTools MySQL/MariaDB/TiDB extensions in VSCODE.
2. Setup SQL connection as per the documentation provided.
3. On the left hand side of VSCODE, in the vertical column listing options such as File Explorer, Search, Version Control, etc., at the very bottom click the cylinder labeled “SQLTools”
4. Depending on what you may see, do the following:
    a) If there is already a connection existing, right click and choose Edit Connection
    b) If there are no connections, hover over the Connections header (below the SQLTools header, which is below File, Edit, Selection, etc.), and select “Add New Connection”.
        i. When given the options between MariaDB, MySQL, and TiDB, choose MySQL.
5. Upon choosing MySQL, you will see a list of settings to input. Please set them as the following:
    a) Connection Name: Whatever you would like
    b) Connection Group: Leave blank
    c) Connect Using: Server and Port
    d) Server Address: localhost
    e) Port: Your X Protcol Port Number from MySQL Setup 3a, which was 33060 by default
    f) Database: heatmaps
    g) Username: root
    h) Password mode: Save as plaintext in settings
    i) Password: Your password from MySQL Setup 3b.
Under MySQL driver specific options: 
    j) Authentication Protocol: xprotocol
    k) SSL: Disabled
    l) Connection Timeout: 30
    m) Show records default limit: 50
6. Once these settings are configured, press “Test Connection” in the bottom right. If everything is configured correctly, then you should see a green box with the words “Successfully connected!” on the bottom left. You can now save this connection.
7. In the cloned repository (the heatmaps folder), create a new file in the Backend folder simply called “.env”. In this folder, write the following, replacing the password with the one you chose for MySQL:
        DB_HOST='localhost'
        DB_USER='root'
        DB_PASS='yourpasswordfromMySQLSetup3b'
        DB_NAME='heatmaps'
You should now be ready to start creating and populating the utilization tables in VSCODE.

## Populating the SQL Table Using Python
1. Assuming the python environment was setup correctly, open the “MySQL Local.session.sql” in the cloned repository's Data folder.
2. Once opened, click the “run on active connection” button (you may need to hover near the top of the code to see it). Once it runs, a new tab on the right should open that is blank with the title “MySQL Local: CREATE TABLE room_utilization”. The utilization table has been created but is merely empty, hence the blank tab. You can close this for now.
3. Open the dataExport.py file in the same Data folder and run it in the top right corner. After a little while, the terminal at the bottom should state “Data has been inserted into the MySQL database.”
4. To double check the table has been filled:
    a) Open “Showdata.sql” in the Data folder, and click “run on active connection” in the same spot as before (in step 2).
    b) Once ran, another tab on the right should open, but this time it will be a table with 3 columns:
        i) building, with the current building name
       ii) room_number, with the room associated with aforementioned building,
      iii) utilization_percent, with a decimal value given.
If you can see the data as mentioned above, then you have successfully set up the MySQL database and pulled the data from the spreadsheet. 

## Node.js Setup
1. Install Node.js from [this link](https://nodejs.org/en/download). Follow the prompts to install all dependencies.
2. Navigate to the backend directory and install required libraries using:
        npm install mysql2 dotenv
3. Once the libraries are installed, you are ready to run the application! In the terminal, in the backend directory, run the command:
        node server.js
Once this command runs, you should see a line in the terminal that says “Server running on port 3000”. You can now go into your web browser and type “localhost:3000” in the address bar, and you should be able to the see website in its current state.
