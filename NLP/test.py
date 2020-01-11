import nltk
from nltk.corpus import stopwords

# tokens = [t for t in text.split()]

# sr=stopwords.words('english')
# clean_tokens = tokens[:]
# for token in tokens:
#     if token in stopwords.words('english'):
#         clean_tokens.remove(token)
# freq = nltk.FreqDist(clean_tokens)

# freq.plot(20, cumulative=False)

def proces_sentence(sentence):
    tokens = [t for t in sentence.split()]
    sr = stopwords.words('english')
    clean_tokens = tokens[:]
    for token in tokens:
        if token in sr:
            clean_tokens.remove(token)
    
    
    print(clean_tokens)

print(stopwords.words('english'))
