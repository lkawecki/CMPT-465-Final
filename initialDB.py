#this file will initialize a database connection if it does not exist
#when the app is run
import sqlite3
import os
import csv

db_file_name='mcreads.db'

def initialize(db_file_name):
    #will be called by open_database() in app.py
        connection=sqlite3.connect(db_file_name)
        
        cursor=connection.cursor()
        
        # create tables
        # users table..
        # we will have multiple tables initialized but for now we're just 
        # going to create and back up the data for the Users table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Users (
                userID TEXT PRIMARY KEY,
                password TEXT,
                email TEXT
            )
    ''')

#library table to connect users with their books
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Library (
                userID TEXT,
                bookID TEXT,
                PRIMARY KEY (userID, bookID),
                FOREIGN KEY (userID) REFERENCES Users(userID)
            )
    ''')

#list table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS Lists (
                listID INTEGER,
                userID TEXT,
                list_name TEXT,
                bookID TEXT,
                PRIMARY KEY (listID,userID,bookID),
                FOREIGN KEY (userID) REFERENCES Users(userID)
            )               
    ''')

        
        dir=os.getcwd()
      
        library_table_backup_file = os.path.join(dir,'library-table-backup.csv')
        lists_table_backup_file = os.path.join(dir,'lists-table-backup.csv')
        users_table_backup_file = os.path.join(dir,'users-table-backup.csv')


        cursor = connection.cursor()


# populate each table with backup info, we can assume there wont be duplicates bc we'll only call this function
    
#for library
        with open(library_table_backup_file, 'r') as file:
            csv_reader = csv.reader(file)
    # skip the header row if it exists
            next(csv_reader, None)
    
            for row in csv_reader:
                if row and len(row)==2:
                    cursor.execute(f'INSERT OR IGNORE INTO Library (userID,bookID) VALUES (?,?)', (row[0],row[1]))

# for lists
        with open(lists_table_backup_file, 'r') as file:
            csv_reader = csv.reader(file)

            for row in csv_reader:
                if row and len(row)==4:
                    cursor.execute(f'INSERT OR IGNORE INTO Lists (listID,bookID,list_name,userID) VALUES (?,?,?,?)', (row[0],row[1],row[3]))

#for users
        with open(users_table_backup_file, 'r') as file:
            csv_reader = csv.reader(file)
    
            for row in csv_reader:

                if row and len(row)==3:
                    cursor.execute(f'INSERT OR IGNORE INTO Users (userID,password,email) VALUES (?,?,?)', (row[0],row[1],row[3],row[4]))


            
        connection.commit()
        connection.close()
