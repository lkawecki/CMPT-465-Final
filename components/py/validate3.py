import mysql.connector
from google.cloud import secretmanager

def get_secret(project_id, secret_id, version_id="latest"):
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"
    response = client.access_secret_version(name=name)
    return response.payload.data.decode("UTF-8")

# Replace with your actual Google Cloud project ID and Secret Manager secret ID
project_id = "formal-vertex-406518"
secret_id = "my-db-credentials"

secret_data=get_secret(project_id,secret_id)

# Fetch database credentials from Secret Manager
#db_user = get_secret(project_id, secret_id, "user")
#print(f'username: {db_user}')
#print('----------------------------')
#db_password = get_secret(project_id, secret_id, "password")
#print(f'pass: {db_password}')
# Replace placeholders with your actual database information
connection = mysql.connector.connect(user='root',password=secret_data,host='34.138.204.42',database='Users')



#connection = mysql.connector.connect(**db_config)

cursor = connection.cursor()

cursor.execute('''SELECT * FROM books''')

result = cursor.fetchall()
for row in result:
    print(row)

connection.close()
