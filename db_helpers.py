import sqlite3
import csv

db_name='mcreads.db'

def make_new_user(userID,password,email):
#first add to mcreads.db
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    cursor.execute('INSERT INTO Users (userID, password, email) VALUES (?, ?, ?)', (userID,password,email))

    connection.commit()
    connection.close()
    
#then back this up in backup.csv
    csv_file_path='users-table-backup.csv'
    data_tuple=(userID,password,email)
    
    with open(csv_file_path, 'a', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(data_tuple)