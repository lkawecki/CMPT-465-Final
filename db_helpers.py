import sqlite3
import csv

db_name='mcreads.db'

def make_new_user(userId,email,password):
#first add to mcreads.db
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    cursor.execute('INSERT INTO Users (userId,password,email) VALUES (?,?,?)', (userId,password,email))

    connection.commit()
    connection.close()
    
#then back this up in backup.csv
    csv_file_path='users-table-backup.csv'
    data_tuple=(userId,email,password)
    
    with open(csv_file_path, 'a', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(data_tuple)
        
# in library, return all tuples with userID
def get_library(userID):
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    
    cursor.execute('SELECT * FROM Library WHERE userID=?',(userID,))
    
    results = cursor.fetchall()
    
    return results

# in library, return all tuples with userID