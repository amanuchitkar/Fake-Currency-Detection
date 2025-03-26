# -*- coding: utf-8 -*-


from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
import numpy as np
import tensorflow as tf
import tensorflow as tf
import cv2


from tensorflow.compat.v1 import ConfigProto
from tensorflow.compat.v1 import InteractiveSession

config = ConfigProto()
config.gpu_options.per_process_gpu_memory_fraction = 0.2
config.gpu_options.allow_growth = True
session = InteractiveSession(config=config)
# Keras
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
#from gevent.pywsgi import WSGIServer

# Define a flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Model saved with Keras model.save()
model_path ='counterfeit_detector.h5'

# Load your trained model
model = tf.keras.models.load_model(model_path)

# Create uploads folder if it doesn't exist
os.makedirs('uploads', exist_ok=True)

def model_predict(img_path, model):
    img = cv2.imread(img_path, cv2.IMREAD_COLOR)

    if img is None:
        print(f" Error: Could not load image {img_path}")
        return None

    # ✅ Resize the image to match model input
    img_resized = cv2.resize(img, (256, 256))
    img_normalized = img_resized.astype('float32') / 255.0  # Normalize pixel values
    img_expanded = np.expand_dims(img_normalized, axis=0)  # Add batch dimension

    # ✅ Make Prediction
    prediction = model.predict(img_expanded)

    # ✅ Convert Prediction to Label
    confidence = prediction[0][0]  # Extract probability
    if confidence > 0.5:
        label = "Fake Note"
    else:
        label = "Real Note"

    print(f" Prediction: {label} ")
    return label



@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, model)
        result = preds
        return result
    return None


if __name__ == '__main__':
    app.run(port=5001, debug=True)
