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
            userId = data.get('userId')

        #   connect to the database
        #   since the database will be initialized in main.jsx, 
        #   we dont need to call initialDB here
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        #  check if the user exists
        # current sign in response says that it does not recognize this table
        # in tableplus, we can confirm this table exists
            cursor.execute('SELECT * FROM Users WHERE userId=? AND password=? AND email=?', (userId,password,email))
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
            userId = data.get('userId')
            
        # test to see whats being passed by .jsx    
         #   print(f"Received data: email={email}, password={password}, userId={userId}")


        # Perform validation and store user in the database
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        # Check if the user already exists 
            cursor.execute('SELECT * FROM Users WHERE email=?', (email,))
            existing_user = cursor.fetchone()

            if existing_user:
                connection.close()
                return jsonify({'status': 'error', 'message': 'User with this email already exists'})

        # if the user doesn't exist, insert into the database
            else:
                connection.close()
                
                db_helpers.make_new_user('userId','email','password')
             
                return jsonify({'status': 'success', 'message': 'Signup successful'})

        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    
    
    return app

if __name__ == '__main__':
    create_app().run(debug=True)