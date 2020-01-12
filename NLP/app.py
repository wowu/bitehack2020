from flask import Flask, jsonify
import json
from services import similar_words

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

@app.route('/v1.0/similar_nouns/<string:word>', methods=['GET'])
def get_similar_nouns(word):
    nouns = similar_words.get_nouns(word)
    return jsonify({'nouns': nouns})

@app.route('/v1.0/similar_verbs/<string:word>', methods=['GET'])
def get_similar_verbs(word):
    verbs = similar_words.get_verbs(word)
    return jsonify({'verbs': verbs})


@app.route('/v1.0/proces_sentence/<string:sentence>', methods=['GET'])
def proces_sentence(sentence):
    words = similar_words.proces_sentence(sentence)
    return jsonify({'words': words})

if __name__ == '__main__':
    app.run(port=6000, host='0.0.0.0')

