# Real or Forge Signature Detection

A web application that uses deep learning to detect whether a signature is real or fraudulent.

## Overview

This project provides a simple web interface where users can upload signature images and get instant verification results. The system uses a trained deep learning model to classify signatures as original or fraudulent.

## Features

- Simple web interface for signature upload
- Real-time signature verification
- Visual feedback on classification results


## Requirements

- Python 3.6 or higher
- TensorFlow 2.x
- Flask
- Pillow (PIL)

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/Real-Forge-Signature-Detection.git
   cd Real-Forge-Signature-Detection
   ```

2. Create and activate a virtual environment:
   ```
   # On Windows
   python -m venv myenv
   myenv\Scripts\activate

   # On Linux/Mac
   python3 -m venv myenv
   source myenv/bin/activate
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create the uploads directory:
   ```
   mkdir uploads
   ```

## Usage

1. Start the Flask web server:
   ```
   python app.py
   ```

2. Open your web browser and navigate to:
   ```
   http://localhost:5001
   ```

3. Upload a signature image using the web interface
4. Wait for the analysis to complete
5. View the result: "THE SIGNATURE IS ORIGINAL" or "THE SIGNATURE IS FRAUDULENT"

## Project Structure

- `app.py`: Main application file
- `counterfeit_detector.h5`: Trained model file
- `templates/`: HTML templates
- `static/`: CSS, JS, and image files
- `uploads/`: Directory where uploaded signatures are stored

## Frontend Setup

A modern React-based interface with Tailwind CSS has been added to the project:

1. Install Node.js and npm if you don't have them
2. Navigate to the frontend directory
   ```
   cd frontend
   ```
3. Install dependencies
   ```
   npm install
   ```
4. Start the development server
   ```
   npm start
   ```

The React app will run on port 3000 and communicate with the Flask backend on port 5001.

## Running the Complete Application

1. Start the Flask backend:
   ```
   python app.py
   ```
2. In a separate terminal, start the React frontend:
   ```
   cd frontend
   npm start
   ```
3. Access the application at http://localhost:3000



