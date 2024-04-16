# Heatmaps

\documentclass{article}
\usepackage{hyperref}

\title{Heatmaps Project Installation Instructions}
\author{Your Name or Team}
\date{\today}

\begin{document}
\maketitle

\section{Introduction}
This README provides detailed setup instructions for the Heatmaps project. Please follow the steps carefully to ensure proper setup.

\section{Front End Installation}
You will need basic Front-End Dev Tools like HTML, CSS, and JS. Here are the recommended extensions if using VSCode:

\begin{enumerate}
    \item HTML CSS Support
    \item JS installation
    \item HTML Boilerplater
    \item IntelliSense for CSS class names in HTML
    \item Live Preview
\end{enumerate}

\section{Working with the Database}
The project requires Python, MySQL, and JavaScript for database management. Here are the steps to set up the environment:

\subsection{Python Setup}
\begin{itemize}
    \item Install Python and set up the environment. Refer to this \href{https://www.youtube.com/watch?v=9o4gDQvVkLU}{YouTube tutorial}.
    \item Use the following command to install necessary packages:
    \begin{verbatim}
    pip install gspread oauth2client mysql-connector-python python-dotenv
    \end{verbatim}
\end{itemize}

\subsection{API Key Access}
\begin{itemize}
    \item The API Key is available in the GitHub repository after pulling from GIT.
    \item For creating and managing Google Sheets API keys, refer to \href{https://console.cloud.google.com/welcome?project=heatmaps-417802}{Google Cloud Services}.
\end{itemize}

\subsection{MySQL Setup}
\begin{itemize}
    \item Install MySQL from \href{https://dev.mysql.com/downloads/mysql/}{this link}. Use version 8.3.0 or any future version.
    \item Follow the MySQL Configurator steps, particularly noting the port number and root password.
\end{itemize}

\section{Back-End and VSCODE-SQL Server Connection Setup}
\begin{itemize}
    \item Install SQLTools and SQLTools MySQL/MariaDB/TiDB extensions in VSCODE.
    \item Setup SQL connection as per the documentation provided.
\end{itemize}

\section{Node.js Setup}
\begin{itemize}
    \item Install Node.js from \href{https://nodejs.org/en/download}{this link}. Follow the prompts to install all dependencies.
    \item Navigate to the backend directory and install required libraries using:
    \begin{verbatim}
    npm install mysql2 dotenv
    \end{verbatim}
    \item Run the server using:
    \begin{verbatim}
    node server.js
    \end{verbatim}
\end{itemize}

\section{Next Steps}
\begin{enumerate}
    \item Improve UI as per the University of Alberta's brand guidelines.
    \item Connect to the MasterSheet for comprehensive data integration.
\end{enumerate}

\end{document}

