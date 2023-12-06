from flask import Flask, jsonify,request
from flask_cors import CORS
from initialDB import initialize
import os
import sqlite3

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
            email = data.get('email')
            password = data.get('password')

        #   connect to the database
        #   since the database will be initialized in main.jsx, 
        #   we dont need to call initialDB here
            connection = sqlite3.connect('mcreads.db')
            cursor = connection.cursor()

        #  check if the user exists
        # current sign in response says that it does not recognize this table
        # in tableplus, we can confirm this table exists
            cursor.execute('SELECT * FROM Users WHERE email=? AND password=?', (email,password))
            user = cursor.fetchone()

            connection.close()
            
            print(user)

            if user:
            # edit later - redirect to home page
                return jsonify({'status': 'success', 'message': 'Login successful'})
            else:
                return jsonify({'status': 'error', 'message': 'Invalid email or password'})
        except Exception as e:
            return jsonify({'status': 'error', 'message': str(e)})
    return app

if __name__ == '__main__':
    create_app().run(debug=True)