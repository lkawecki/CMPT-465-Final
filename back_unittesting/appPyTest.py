import unittest
from flask import Flask, jsonify, request
import sqlite3
import os
        
db_file_name = 'mcreads_test.db'


class TestApp(unittest.TestCase):

    def setUp(self):
        self.app = Flask(__name__)
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

        self.db_file_name = db_file_name
        
        # in place of using initialize - having import issues
        with sqlite3.connect(self.db_file_name) as connection:
            cursor = connection.cursor()

            cursor.execute('''
                CREATE TABLE IF NOT EXISTS Users (
                    userID INTEGER PRIMARY KEY,
                    username TEXT,
                    password TEXT,
                    email TEXT
                )
            ''')

            connection.commit()

    def tearDown(self):
        os.remove(self.db_file_name)

    def test_index_route(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, 200)

    def test_open_database_route(self):
        response = self.client.get('/open-database')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(os.path.exists(self.db_file_name))  # Check if the database file is created

    def test_login_route(self):
        # dummy login request
        data = {'username': 'test_user', 'password': 'test_password'}
        response = self.client.post('/login', json=data)

        # verify if the response is as expected
        self.assertEqual(response.status_code, 200)
        self.assertIn('status', response.json)
        self.assertIn('message', response.json)


if __name__ == '__main__':
    unittest.main()
