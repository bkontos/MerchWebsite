"""from flask import Flask
from calculations import totalSold


app = Flask(__name__)

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    # Process the input data using calculations.py
    # Return the results as a JSON response
    return jsonify(results)

@app.route('/export-data', methods=['GET'])
def export_data():
    response = save_data()"""