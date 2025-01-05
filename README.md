0# 📰 Fake News Detector

Fake News Detector is a web application designed to identify fake news articles using machine learning. The project includes a Python-based backend and a responsive frontend for easy interaction.

---

## 🚀 Features

- **Article Analysis**: Analyze the text of any article for authenticity.
- **Probability Scores**: Get the likelihood of the article being real or fake.
- **Verdict**: Clear classification of the article as "Real News" or "Fake News."
- **User-Friendly Interface**: Clean and responsive design for seamless usage.

---

## 🛠️ Technology Stack

### Backend
- **Python**: Core language for the backend.
  - Flask: REST API framework.
  - Scikit-learn: Machine learning library for training the model.
  - Pandas & NumPy: Data manipulation and preprocessing.
  - Pickle: Model and vectorizer serialization.

### Frontend
- **HTML5**: Markup for the user interface.
- **CSS3**: Styling for the application.
- **JavaScript**: Interactive functionality.

---

## 📂 Project Structure

├── - backend/
│   ├── - backend_api.py                # Flask API for the Fake News Detector.
│   ├── - fake_news_model.pkl           # Pretrained machine learning model.
│   ├──  -fake_news.py                  # Python code for training the model.
├──  - frontend/
│   ├── - index.html                    # Main HTML file.
│   ├── - style.css                     # CSS for styling the UI.
│   ├── script.js                     # JavaScript for frontend logic.
├── - data/
│   ├── - train.csv                     # Dataset used for training the model.             
└── - requirements.txt                  # Python dependencies.


---

## 🧠 How It Works

1. **Model Training**: A machine learning model is trained using labeled data (real and fake news articles). 
   - The model is saved as `fake_news_model.pkl`.

2. **Backend API**:
   - Processes input text via a Flask API.
   - Predicts the probability and verdict (real or fake) of the news article.

3. **Frontend**:
   - Users input article text into a simple interface.
   - Receives prediction results from the API and displays them.

---

## 🔧 Setup Instructions

### Prerequisites
- Python 3.8+
- Flask
- Node.js (optional for frontend development)

---
### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/fake-news-detector.git
   cd "fake news detector"
   pip install -r requirements.txt     
   cd backend
   python backend.py
   frontend/index.html
---   
## 📝 Usage

1. Launch the application.
2. Paste the text of a news article into the input field.
3. Click the "Analyze" button.
4. View the probability score and verdict.

---
## 📊 Dataset

The project uses a labeled dataset of real and fake news articles:

- **Columns**:
   - **id**: Article ID 
   - **title**: Article title
   - **author**: Author name
   - **text**: Article content
   - **label**: 1 for real news, 0 for fake news.
   
Dataset is included in the data/ directory.

---
## 🎯 Future Improvements

- Enhance model accuracy with advanced algorithms (e.g., transformers).
- Add multi-language support for global applicability.
- Integrate real-time scraping of news articles for analysis.

---
### 🙌 Acknowledgments
- Dataset: https://www.kaggle.com/competitions/fake-news/data?select=train.csv
- Inspired by the need to tackle misinformation effectively.
