# Heatmaps

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
The project requires Python, MySQL, and JavaScript for database management. Here are the steps to set up the environment:

### Python Setup
- Install Python and set up the environment. Refer to this [YouTube tutorial](https://www.youtube.com/watch?v=9o4gDQvVkLU).
- Use the following command to install necessary packages:

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
5. 






## Node.js Setup
- Install Node.js from [this link](https://nodejs.org/en/download). Follow the prompts to install all dependencies.
- Navigate to the backend directory and install required libraries using:

