from dotenv import load_dotenv
import mysql.conector
import os

load_dotenv()

db_config = {
    'user' : os.getenv('MARIADB_USER'),
    'password': os.getenv('MARIADB_PASSWORD'),
    'host': '127.0.0.1', 
    'database': os.getenv('MARIADB_DATABASE'), 
    'collation': 'uft8mb4_general_ci'
}

conn = mysql.conector.connect(**db_config)
cursor = conn.cursor()

with open('./database.sql', 'r') as sql_file:
    script = sql_file.read()
    for statment in script.split("--"):
        if statment.strip():
            cursor.execute(statment)

conn.commit()
cursor.close()
conn.close()