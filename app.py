from flask import Flask, jsonify
from initialDB import make_connection

app = Flask(__name__)

@app.route('/open-database')
def open_database():
    result=make_connection()
    return jsonify()

if __name__ == '__main__':
    app.run(debug=True)