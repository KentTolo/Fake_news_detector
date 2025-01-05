from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

# Load model and vectorizer
with open('fake_news_model.pkl', 'rb') as f:
    model, vectorizer = pickle.load(f)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    news_text = data.get('text', '')
    if not news_text:
        return jsonify({'error': 'No text provided'}), 400

    # Vectorize and predict
    input_vector = vectorizer.transform([news_text])
    prediction = model.predict(input_vector)[0]
    probability = model.predict_proba(input_vector)[0]
    confidence = probability[1] if prediction == 1 else probability[0]
    
    label = 'Real News' if prediction == 1 else 'Fake News'
    return jsonify({
        'prediction': label,
        'confidence': float(confidence)
    })

if __name__ == '__main__':
    app.run(debug=True)