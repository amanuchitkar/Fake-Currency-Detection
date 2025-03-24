import numpy as np
import cv2
import tensorflow as tf

#  Load the trained model
model_path = ("counterfeit_detector.h5")
model = tf.keras.models.load_model(model_path)

#  Function to Predict a Single Currency Note
def predict_currency(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_COLOR)

    if img is None:
        print(f" Error: Could not load image {image_path}")
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

#  Example Usage
image_path = r"C:\Users\ankit\PycharmProjects\PythonProject5\Dataset\Real\2 - Copy.jpg"
result = predict_currency(image_path)
