import sqlite3
import csv

db_name='mcreads.db'

def make_new_user(userID,email,password):
#first add to mcreads.db

    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    cursor.execute('INSERT INTO OR IGNORE Users (userId,password,email) VALUES (?,?,?)', (userID,password,email))
        
    connection.commit()
    connection.close()
    
#then back this up in backup.csv
    csv_file_path='users-table-backup.csv'
    data_tuple=(userID,email,password)
    
    with open(csv_file_path, 'a', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(data_tuple)

# adds new book to user's library  
def set_new_book(userID,bookID):
# first add to mcreads.db
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    cursor.execute('INSERT INTO Library (userID,bookID) VALUES (?, ?)', (userID, bookID,))
    
    connection.commit()
    connection.close()

# then back this up in backup.csv
    csv_file_path='users-table-backup.csv'
    data_tuple=(userID,bookID)
    
    with open(csv_file_path, 'a', newline='') as file:
        csv_writer = csv.writer(file)
        csv_writer.writerow(data_tuple)

    
# in library, return all tuples with userID
def get_library(userID):
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    
    cursor.execute('SELECT bookID FROM Library WHERE userID=?',(userID,))
    
    results = cursor.fetchall()
    
    return results

# in lists, return all tuples with userID
# gonna write an overloaded function
# one will return just one specific user list
# the other will return all the user's lists
def get_list(userID):
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    
    cursor.execute('SELECT * FROM Lists WHERE userID=?',(userID,))
    
    results = cursor.fetchall()
    
    return results

def get_list(userID,listID):
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    
    cursor.execute('SELECT * FROM Lists WHERE userID=? AND listID=?',(userID,listID))
    
    results = cursor.fetchall()
    
    return results