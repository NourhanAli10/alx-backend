#!/usr/bin/env python3
""" Basic Flask app module.
"""

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    """ Hello method"""
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
