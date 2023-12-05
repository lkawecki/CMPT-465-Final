from flask import Flask, jsonify
import initialDB

app = Flask(__name__)

@app.route('/open-database')
def open_database():
    result=initialDB
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)