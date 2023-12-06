from flask import Flask, jsonify,request
from initialDB import initialize
import os
import sqlite3

app = Flask(__name__)

db_file_name = 'mcreads.db'

@app.route('/')#should create database as soon as npm run dev executes
def index():
    open_database()
    

@app.route('/open-database')
def open_database():
    print(f"Database will be created at: {os.path.abspath(db_file_name)}")
    connection=sqlite3.connect(db_file_name)
    connection = sqlite3.connect('mcreads.db')
    cursor = connection.cursor()

    # Add code to create tables if needed

    connection.commit()  # Commit changes to the database
    connection.close()    

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        # connect to the database
        #   since the database will be initialized in main.jsx, 
        #   we dont need to call initialDB here
        connection = sqlite3.connect('mcreads.db')
        cursor = connection.cursor()

        #  check if the user exists
        cursor.execute('SELECT * FROM Users WHERE username=? AND password=?', (username,password))
        user = cursor.fetchone()

        connection.close()

        if user:
            # edit later - redirect to home page
            return jsonify({'status': 'success', 'message': 'Login successful'})
        else:
            return jsonify({'status': 'error', 'message': 'Invalid username or password'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})


if __name__ == '__main__':
    app.run(debug=True)