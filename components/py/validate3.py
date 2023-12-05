#this file will initialize a database connection if it does not exist
#when the app is run
import sqlite3
import os
import csv

db_file_name='mcreads.db'
dir=os.getcwd()
dir=os.path.join(dir,'..')
dir=os.path.join(dir,'backups')
books_table_backup_file = os.path.join(dir,'books-table-backup.csv')
library_table_backup_file = os.path.join(dir,'library-table-backup.csv')
listbooks_table_backup_file = os.path.join(dir,'listbooks-table-backup.csv')
lists_table_backup_file = os.path.join(dir,'lists-table-backup.csv')
users_table_backup_file = os.path.join(dir,'users-table-backup.csv')


#mcreads.db will save in dir/mcreads.db
connection = sqlite3.connect('mcreads.db')

cursor = connection.cursor()


# create tables
#users table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Users (
        userID INTEGER PRIMARY KEY,
        username TEXT,
        password TEXT,
        email TEXT
    )
''')

#books table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Books (
        bookID INTEGER PRIMARY KEY,
        title TEXT,
        author TEXT
    )
''')

#library table to connect users with their books
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Library (
        userID INTEGER,
        bookID INTEGER,
        PRIMARY KEY (userID, bookID),
        FOREIGN KEY (userID) REFERENCES Users(userID),
        FOREIGN KEY (bookID) REFERENCES Books(bookID)
    )
''')

#list table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS Lists (
        listID INTEGER PRIMARY KEY,
        userID INTEGER,
        list_name TEXT,
        FOREIGN KEY (userID) REFERENCES Users(userID)
    )               
''')

#listBooks table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS ListBooks (
        listID INTEGER,
        bookID INTEGER,
        PRIMARY KEY (listID,bookID),
        FOREIGN KEY (listID) REFERENCES Lists(listID),
        FOREIGN KEY (bookID) REFERENCES Books(bookID)
    )
''')

#populate each table with backup info, we can assume there wont be duplicates bc we'll only call this function
#when the mcreads.db file doesnt already exist

#for books
with open(books_table_backup_file, 'r') as file:
        csv_reader = csv.reader(file)
    # skip the header row if it exists
        next(csv_reader, None)
    
        for row in csv_reader:
        # Assuming the CSV columns are in the order id, username, email
            cursor.execute(f'INSERT INTO Books (bookID) VALUES (?)', (row[0]))

#for library
with open(library_table_backup_file, 'r') as file:
        csv_reader = csv.reader(file)
    # skip the header row if it exists
        next(csv_reader, None)
    
        for row in csv_reader:
        # Assuming the CSV columns are in the order id, username, email
            cursor.execute(f'INSERT INTO Library (userID,bookID) VALUES (?,?)', (row[0],row[1]))

#for listbooks
with open(listbooks_table_backup_file, 'r') as file:
        csv_reader = csv.reader(file)
    # skip the header row if it exists
        next(csv_reader, None)
    
        for row in csv_reader:
        # Assuming the CSV columns are in the order id, username, email
            cursor.execute(f'INSERT INTO ListBooks (listID,bookID) VALUES (?,?)', (row[0],row[1]))

#for listbooks
with open(lists_table_backup_file, 'r') as file:
        csv_reader = csv.reader(file)
    # skip the header row if it exists
        next(csv_reader, None)
    
        for row in csv_reader:
        # Assuming the CSV columns are in the order id, username, email
            cursor.execute(f'INSERT INTO Lists (listID,bookID,list_name) VALUES (?,?,?)', (row[0],row[1],row[3]))
            

#for users
with open(users_table_backup_file, 'r') as file:
        csv_reader = csv.reader(file)
    # skip the header row if it exists
        next(csv_reader, None)
    
        for row in csv_reader:
        # Assuming the CSV columns are in the order id, username, email
            cursor.execute(f'INSERT INTO Users (userID,username,password,email) VALUES (?,?,?,?)', (row[0],row[1],row[3],row[4]))
            
            
#test whats in tables
connection.commit()
connection.close()
