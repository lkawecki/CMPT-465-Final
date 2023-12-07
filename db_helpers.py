import sqlite3
import csv
import os

db_name='mcreads.db'

def make_new_user(userID,password,email):
#first add to mcreads.db

    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()

    cursor.execute('INSERT OR IGNORE INTO Users (userID,password,email) VALUES (?,?,?)', (userID,password,email))

    connection.commit()
    connection.close()
    
#then back this up in backup.csv
    csv_file_path='users-table-backup.csv'
    data_tuple=(userID,password,email)
    
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

# creates new list in Lists table
def insert_new_list(userID, list_name):
    # Connect to the SQLite database
    connection = sqlite3.connect(db_name)
    cursor = connection.cursor()

    try:
        # Fetch the maximum listID for the specified userID
        cursor.execute("SELECT COALESCE(MAX(listID), 0) + 1 FROM Lists WHERE userID = ?", (userID,))
        next_listID = cursor.fetchone()[0]  # Fetch the next listID

        # Insert a new row into the Lists table
        cursor.execute("INSERT INTO Lists (userID, listID, list_name) VALUES (?, ?, ?)",
                       (userID, next_listID, list_name))
        
        # Commit the transaction and close the connection
        connection.commit()
        connection.close()

    except Exception as e:
        print("Error:", e)
        connection.rollback()
        connection.close()   

# in lists, return all tuples with userID
# gonna write an overloaded function
# one will return just one specific user list
# the other will return all the user's lists
def get_list(userID):
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    
    cursor.execute('SELECT * FROM Booklists WHERE userID=?',(userID,))
    
    results = cursor.fetchall()
    
    return results

def get_list(userID,listID):
    connection = sqlite3.connect(db_name)
    cursor=connection.cursor()
    
    cursor.execute('SELECT * FROM Booklists WHERE userID=? AND listID=?',(userID,listID))
    
    results = cursor.fetchall()
    
    return results
    
def save_before_close():
    
    dir=os.getcwd()

    library_table_backup_file = os.path.join(dir,'library-table-backup.csv')
    lists_table_backup_file = os.path.join(dir,'lists-table-backup.csv')
    users_table_backup_file = os.path.join(dir,'users-table-backup.csv')
    listbooks_table_backup_file = os.path.join(dir,'listbooks-table-backup.csv')
    
    connection = sqlite3.connect(db_name)
    cursor = connection.cursor()
    
#users
    cursor.execute(f'SELECT * FROM Users')
    all_tuples = cursor.fetchall()

    with open(users_table_backup_file,'w',newline='')as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(all_tuples)

#library
    cursor.execute(f'SELECT * FROM Library')
    all_tuples = cursor.fetchall()

    with open(library_table_backup_file,'w',newline='')as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(all_tuples)
        
#lists
    cursor.execute(f'SELECT * FROM Lists')
    all_tuples = cursor.fetchall()

    with open(lists_table_backup_file,'w',newline='')as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(all_tuples)
        
#listbooks
    cursor.execute(f'SELECT * FROM Listbooks')
    all_tuples = cursor.fetchall()

    with open(listbooks_table_backup_file,'w',newline='')as file:
        csv_writer = csv.writer(file)
        csv_writer.writerows(all_tuples)
        
    connection.close()
    