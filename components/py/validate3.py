import mysql.connector
from google.auth.transport.requests import Request
from google.oauth2 import service_account


#connection = mysql.connector.connect(**db_config)

cursor = connection.cursor()

cursor.execute('''SELECT * FROM books''')

result = cursor.fetchall()
for row in result:
    print(row)

connection.close()
