from flask import Flask

app = Flask(__name__)

@app.route('/api')
def api():
    # your code for calculations and data processing goes here
    return "Hello from the backend!"