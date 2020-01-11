from flask import Flask, jsonify
import json
from services import similar_words

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/synonyms/api/v1.0/similar_nouns/<string:word>', methods=['GET'])
def get_similar_nouns(word):
    nouns = similar_words.get_nouns(word)
    return jsonify({'nones': nouns})

@app.route('/synonyms/api/v1.0/similar_verbs/<string:word>', methods=['GET'])
def get_similar_verbs(word):
    verbs = similar_words.get_verbs(word)
    return jsonify({'verbs': verbs})

if __name__ == '__main__':
    app.run(debug=True)

