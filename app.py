from flask import Flask, jsonify,request
from flask_cors import CORS
from initialDB import initialize
import os
import sqlite3
import db_helpers
import re

app = Flask(__name__)
CORS(app)#connects CORS to all routes

db_file_name = 'mcreads.db'

def create_app():
    
    initialize(db_file_name)

    @app.route('/')#should create database as soon as npm run dev executes
    def index():
        return "App initial"#place holder

    @app.route('/open-database')
    def open_database():
        print(f"Database will be created at: {os.path.abspath(db_file_name)}")
        connection = sqlite3.connect('mcreads.db')
        cursor = connection.cursor()

        connection.commit()  # Commit changes to the database
        connection.close()
    
        return login()  

    @app.route('/login', methods=['POST'])
    def login():
        try:
            data = request.get_json()
            email = data.get('logEmail')
            password = data.get('logPassword')
            userID = data.get('userID')
            
            if email=='' or password=='':
                 return jsonify({'status': 'error', 'message': 'Please do not leave fields empty'})
             
            pattern = r'^\S+@manhattan.edu'
            if not re.match(pattern, email):
                return jsonify({'status': 'error', 'message': 'Invalid Manhattan College email'})

        #   connect to the database
        #   since the database will be initialized in main.jsx, 
        #   we dont need to call initialDB here
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        #  check if the user exists
        # current sign in response says that it does not recognize this table
        # in tableplus, we can confirm this table exists
            cursor.execute('SELECT * FROM Users WHERE userID=? AND password=? AND email=?', (userID,password,email,))
            user = cursor.fetchone()

            connection.close()
            
            if user is None:
                return jsonify({'status': 'error','message': 'Invalid login credentials'})
            else:
                return jsonify({'status': 'success','message': user})
        
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    
    #route to signUp
    @app.route('/signUp', methods=['POST'])
    def signUp():
        try:
            data = request.get_json()
            email = data.get('regEmail')
            password = data.get('regPassword')
            userID = data.get('userID')
            
            if email=='' or password=='':
                 return jsonify({'status': 'error', 'message': 'Please do not leave fields empty'})
                 
            pattern = r'^\S+@manhattan.edu'
            if not re.match(pattern, email):
                return jsonify({'status': 'error', 'message': 'Invalid Manhattan College email'})

        # Perform validation and store user in the database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        # Check if the user already exists 
            cursor.execute('SELECT * FROM Users WHERE email=?', (email,))
            existing_user = cursor.fetchone()

            if existing_user is None:
                connection.close()
                db_helpers.make_new_user(userID,password,email)
                return jsonify({'status': 'success', 'message': 'Signup successful'})
                
            connection.close()
            return jsonify({'status': 'error', 'message': 'User with this email already exists'})

        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    
    # Route to add book to library
    @app.route('/add_to_library', methods=['POST'])
    def add_to_library():
        try:
            data = request.get_json()
            userID = data.get('userId')
            bookID = data.get('bookId')
            print(f"Received data: bookId={bookID}, userID={userID}")
            # Connect to database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

            # see if tuple already exists in library
            cursor.execute('SELECT * FROM Library WHERE userID=? AND bookID=?', (userID,bookID,))
            existing_entry = cursor.fetchone()

            if existing_entry:
                connection.close()
                return jsonify({'status': 'error', 'message': 'Entry already exists in the library'})
            else:
                cursor.execute('INSERT INTO Library (userID,bookID) VALUES (?, ?)', (userID, bookID,))
                connection.commit()
                connection.close()
                
                db_helpers.set_new_book(userID,bookID)
                
                return jsonify({'status': 'success', 'message': 'Book added to the library'})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    
    # Route to check if a book exists in the library
    @app.route('/check_library', methods=['POST'])
    def check_library():
        try:
            data = request.get_json()
            userID = data.get('userID')
            bookID = data.get('bookId')

            # Connect to the database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

            # Check if the bookId-userId tuple already exists in the Library table
            cursor.execute('SELECT * FROM Library WHERE userID=? AND bookID=?', (userID, bookID))
            existing_entry = cursor.fetchone()

            connection.close()

            exists = bool(existing_entry)  # Check if entry exists in the library

            return jsonify({'exists': exists})

        except Exception as e:
            return jsonify({'error': str(e)})

    @app.route(f'/get_library/<userID>', methods=['GET'])
    def get_library(userID):
        try:
            connection = sqlite3.connect('mcreads.db')
            cursor=connection.cursor()
    
            cursor.execute('SELECT bookID FROM Library WHERE userID=?',(userID,))
    
            results = cursor.fetchall()
            connection.close()
    
            return jsonify(results)
        except Exception as e:
            return jsonify({'error': str(e)})

    # Route to create a list
    @app.route('/create_list', methods=['POST'])
    def create_list():
        try:
            data = request.get_json()
            userID = data.get('userID')
            listName = data.get('listName')

            # connect to the database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

            cursor.execute('SELECT * FROM List WHERE list_name=? AND userID=?', (listName,userID))
            existing_entry = cursor.fetchone()

            if existing_entry:
                # if book already exists, ignore
                connection.close()
                
                # place holder json message
                return jsonify({'message': 'List already exists in table'})
            
            else: 
                connection.close()

                db_helpers.insert_new_list(userID,listName)
                
                return jsonify({'status': 'success', 'message': 'List added to the table'})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    # Route to add a book to the list
    @app.route('/add_to_list', methods=['POST'])
    def add_to_list():
        try:
            data = request.get_json()
            userID = data.get('userID')
            listID = data.get('listId')
            bookID = data.get('bookId')

            # Connect to the database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

            # Check if the bookId-userId tuple already exists in the Library table
            cursor.execute('SELECT * FROM Library WHERE userID=? AND bookID=?', (userID, bookID))
            existing_entry = cursor.fetchone()

            if not existing_entry:
                # If the book doesn't exist in the library, add it
                cursor.execute('INSERT INTO Library (userID, bookID) VALUES (?, ?)', (userID, bookID))
            # check if the book already exists in the list
            cursor.execute('SELECT * FROM Booklist WHERE listID=? AND userID=? AND bookID=?', (listID,userID,bookID))
            existing_entry = cursor.fetchone()

            if existing_entry:
                # if book already exists, ignore
                connection.close()
                
                # place holder json message
                return jsonify({'message': 'Book already exists in list'})
            else:
                # Insert a new row into the ListBooks table
                cursor.execute("INSERT INTO ListBooks (userID, listID, bookID) VALUES (?, ?, ?)",
                           (userID, listID, bookID))
            
                # Commit the transaction and close the connection
                connection.commit()

            # Proceed to add the book to the list
            cursor.execute('INSERT INTO UserLists (userID, listID, bookID) VALUES (?, ?, ?)', (userID, listID, bookID))
            connection.commit()

            connection.close()

            return jsonify({'status': 'success', 'message': 'Book added to the list'})

        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    @app.route('/show_list', methods=['GET'])
    def show_list(userID,listID):
        try: 
            connection = sqllite3.connect('mcreads.db')
            cursor = connection.cursor()

            cursor.execute('SELECT * FROM Booklist WHERE userID=? AND listID=?',(userID,listID,))
            existing_entry = cursor.fetchone()

            connection.close

            if(existing_entry):
                results = db_helpers.get_list(userID,listID)
                return jsonify(results)
            else: 
                print("List empty")
                connection.close()
                return []

        except Exception as e:
            return jsonify({'error': str(e)})

    @app.route('/show_all_lists', methods=['GET'])
    def show_all_lists(userID):
        try: 
            connection = sqllite3.connect('mcreads.db')
            cursor = connection.cursor()

            cursor.execute('SELECT * FROM Booklist WHERE userID=?',(userID,))
            existing_entry = cursor.fetchone()

            connection.close

            if(existing_entry):
                results = db_helpers.get_list(userID)
                return jsonify(results)
            else: 
                connection.close()
                
                return jsonify({'status': 'error', 'message': 'User has no lists'})
            

        except Exception as e:
            return jsonify({'error': str(e)})

    @app.route('/show_user_lists', methods=['GET'])
    def show_user_lists(userID):
        connection = sqlite3.connect('mcreads.db')
        cursor = cursor.fetchall()

        try:
            # Query to retrieve all lists associated with the userID
            cursor.execute("SELECT * FROM Lists WHERE userID = ?", (userID,))
            lists = cursor.fetchall()
        
            # Close the connection
            connection.close()

            return jsonify(lists)
        except Exception as e:
            print("Error:", e)
            connection.close()
            return []

    return app

if __name__ == '__main__':
    create_app().run(debug=True)