from flask import Flask, jsonify,request
from flask_cors import CORS
from initialDB import initialize
import os
import sqlite3
import db_helpers

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

        #   connect to the database
        #   since the database will be initialized in main.jsx, 
        #   we dont need to call initialDB here
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        #  check if the user exists
        # current sign in response says that it does not recognize this table
        # in tableplus, we can confirm this table exists
            cursor.execute('SELECT * FROM Users WHERE userID=? AND password=? AND email=?', (userID,password,email))
            user = cursor.fetchone()

            connection.close()
            
            if user:
            # edit later - redirect to home page
                return jsonify({'status': 'success', 'message': 'Login successful'})
            else:
                return jsonify({'status': 'error', 'message': 'Invalid email or password'})
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
        
        # test to see whats being passed by .jsx    
            print(f"Received data: email={email}, password={password}, userID={userID}")

        # Perform validation and store user in the database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        # Check if the user already exists 
            cursor.execute('SELECT * FROM Users WHERE email=?', (email,))
            existing_user = cursor.fetchone()
            print(f"completed check")
            if existing_user:
                connection.close()
                return jsonify({'status': 'error', 'message': 'User with this email already exists'})

        # if the user doesn't exist, insert into the database
            else:

                #cursor.execute('INSERT INTO Users (userID,email,password) VALUES (?,?,?)', (userID,email,password,))
                #connection.commit()

                connection.close()
                
                db_helpers.make_new_user('userId','email','password')
             
                return jsonify({'status': 'success', 'message': 'Signup successful'})

        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    
    # Route to add book to library
    @app.route('/add_to_library', methods=['POST'])
    def add_to_library():
        try:
            data = request.get_json()
            userID = data.get('userID')
            bookID = data.get('bookId')

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
                curson.execute('INSERT INTO Library (userID,bookID) VALUES (?, ?)', (userID, bookID,))
                connection.commit()
                connection.close()
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
                connection.commit()

            # Proceed to add the book to the list
            cursor.execute('INSERT INTO UserLists (userID, listID, bookID) VALUES (?, ?, ?)', (userID, listID, bookID))
            connection.commit()

            connection.close()

            return jsonify({'status': 'success', 'message': 'Book added to the list'})

        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})

    return app

if __name__ == '__main__':
    create_app().run(debug=True)