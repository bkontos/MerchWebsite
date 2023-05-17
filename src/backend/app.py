import os
import logging
import requests
import json
import random
from logging.handlers import RotatingFileHandler
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.middleware.proxy_fix import ProxyFix
from calculations import *

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app)  # Only use this if you trust your reverse proxy
CORS(app)

# Setting up logging
if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/myapp.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('Myapp startup')

@app.route('/api/gross_per_item', methods=['POST'])
def gross_per_item():
    data = request.get_json()
    result = get_gross_per_item(data)
    return jsonify(result)


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
    try:
        request_data = request.get_json()
        data = request_data['data']
        ccData = request_data['ccData']
        result = get_soft_net(data, ccData)
        return jsonify(result)
    except Exception as e:
        app.logger.error(f"An error occurred: {e}")
        return jsonify({"error": "An error occurred"}), 500


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

@app.route('/api/createMerchandise', methods=['POST'])
def create_merchandise():
    merchandise = request.get_json()
    id = ''.join(str(random.randint(0, 9)) for _ in range(10))
    merchandise['id'] = id
    response = requests.post('https://sheetdb.io/api/v1/nc7krlodazbab',
                             headers={'Content-Type': 'application/json',
                                      "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"},
                             data=json.dumps(merchandise))
    return jsonify(response.json()), response.status_code

@app.route('/api/getAllMerchandise', methods=['GET'])
def get_all_merchandise():
    response = requests.get('https://sheetdb.io/api/v1/nc7krlodazbab',
                            headers={'Content-Type': 'application/json',
                                     "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"})
    return jsonify(response.json()), response.status_code

@app.route('/api/updateMerchandise/<id>', methods=['PATCH'])
def update_merchandise(id):
    merchandise = request.get_json()
    response = requests.patch(f'https://sheetdb.io/api/v1/nc7krlodazbab/id/{id}',
                              headers={'Content-Type': 'application/json',
                                       "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"},
                              data=json.dumps(merchandise))
    return jsonify(response.json()), response.status_code

@app.route('/api/deleteMerchandise/<id>', methods=['DELETE'])
def delete_merchandise(id):
    app.logger.info('Deleting merchandise with id: %s', id)
    response = requests.delete(f'https://sheetdb.io/api/v1/nc7krlodazbab/id/{id}',
                               headers={'Content-Type': 'application/json',
                                        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"})
    app.logger.info('Deleting merchandise with id: %s', id)
    return jsonify(response.json()), response.status_code

@app.route('/api/deleteAllMerchandise', methods=['DELETE'])
def delete_all_merchandise():
    response = requests.delete('https://sheetdb.io/api/v1/nc7krlodazbab/all',
                               headers={'Content-Type': 'application/json',
                                        "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"})
    return jsonify(response.json()), response.status_code

@app.route('/api/getCcInfo', methods=['GET'])
def get_cc_info():
    response = requests.get('https://sheetdb.io/api/v1/nc7krlodazbab?sheet=CCSheet',
                                headers={'Content-Type': 'application/json',
                                            "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"})
    return jsonify(response.json()), response.status_code

@app.route('/api/updateCcInfo/<ccId>', methods=['PATCH'])
def update_cc_info(ccId):
    ccId = 1
    cc_info = request.get_json()
    response = requests.patch(f'https://sheetdb.io/api/v1/nc7krlodazbab/id/{ccId}?sheet=CCSheet',
                              headers={'Content-Type': 'application/json',
                                       "Authorization": "Bearer grnkfggenih6anxrua75zd59jbiybyp9ngroc8m2"},
                              data=json.dumps(cc_info))
    return jsonify(response.json()), response.status_code

if __name__ == "__main__":
    app.run()
