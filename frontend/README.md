# Currency Detector Frontend

A React-based frontend for the Currency Detector application using Tailwind CSS.

## Features

- Modern, responsive UI optimized for mobile devices
- Real-time image preview
- Seamless integration with the Flask backend API
- Beautiful result display for real/fake currency detection
- Built with React and Tailwind CSS

## Setup and Installation

1. Make sure you have Node.js and npm installed
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Usage

1. The React app will run on port 3000 and proxy API requests to the Flask backend on port 5001
2. Upload an image of a currency note by clicking on the upload area
3. Click "Verify" to analyze the note
4. View the result showing whether the note is real or fake

## Development

- The app is built with React 18 and uses functional components with hooks
- Styling is done with Tailwind CSS
- The API integration uses Axios for HTTP requests

## API Integration

The app connects to the following API endpoints:

- `/predict` - POST request to analyze the uploaded image

## Mobile Optimization

- Responsive design that works well on all device sizes
- Touch-friendly UI elements
- Optimized performance for mobile networks 