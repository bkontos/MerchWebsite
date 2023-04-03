from flask import Flask, jsonify, request
from flask_cors import CORS
from calculations import *

app = Flask(__name__)
CORS(app)

"""@app.route('/api/gross_per_item', methods=['POST'])
def gross_per_item():
    data = request.get_json()
    result = get_gross_per_item(data)
    return jsonify(result)"""


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

@app.route('/api/cc_fee', methods=['POST'])
def cc_fee():
    ccData = request.get_json()
    result = get_cc_fee(ccData)
    return jsonify(result)

@app.route('/api/soft_net', methods=['POST'])
def soft_net():
    request_data = request.get_json()
    data = request_data['data']
    ccData = request_data['ccData']
    result = get_soft_net(data, ccData)
    return jsonify(result)

@app.route('/api/hard_net', methods=['POST'])
def hard_net():
    data = request.get_json()
    result = get_hard_net(data)
    return jsonify(result)

@app.route('/api/casino_owed_soft', methods=['POST'])
def casino_owed_soft():
    request_data = request.get_json()
    data = request_data['data']
    ccData = request_data['ccData']
    result = get_casino_owed_soft(data, ccData)
    return jsonify(result)

@app.route('/api/casino_owed_hard', methods=['POST'])
def casion_owed_hard():
    data = request.get_json()
    result = get_casino_owed_hard(data)
    return jsonify(result)

@app.route('/api/total_casino_owed', methods=['POST'])
def total_casino_owed():
    request_data = request.get_json()
    data = request_data['data']
    ccData = request_data['ccData']
    result = get_total_casino_owed(data, ccData)
    return jsonify(result)

@app.route('/api/band_revenue', methods=['POST'])
def band_revenue():
    request_data = request.get_json()
    data = request_data['data']
    ccData = request_data['ccData']
    result = get_band_revenue(data, ccData)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)