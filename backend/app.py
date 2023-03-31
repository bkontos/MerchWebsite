from flask import Flask, jsonify, request
from calculations import *

app = Flask(__name__)

@app.route('/api/total_gross', methods=['POST'])
def total_gross():
    data = request.get_json()
    result = get_total_gross(data)
    return jsonify(result)

@app.route('/api/soft_gross', methods=['POST'])
def soft_gross():
    data = request.get_json()
    result = get_soft_gross(data)
    return jsonify(result)

@app.route('/api/hard_gross', methods=['POST'])
def hard_gross():
    data = request.get_json()
    result = get_hard_gross(data)
    return jsonify(result)

@app.route('/api/soft_net', methods=['POST'])
def soft_net():
    data = request.get_json()
    result = get_soft_net(data)
    return jsonify(result)

@app.route('/api/hard_net', methods=['POST'])
def hard_net():
    data = request.get_json()
    result = get_hard_net(data)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)