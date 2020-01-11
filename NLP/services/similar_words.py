from nltk.corpus import wordnet as wn
from nltk.corpus import stopwords


def get_verbs(word, n=5):
    synonyms = wn.synsets(word, pos=wn.VERB)
    syn = set()
    for s in synonyms:
            for l in s.lemmas():
                syn.add(l.name().replace('_',' '))
    return list(syn)[:n]

def get_nouns(word, n=5):
    synonyms = wn.synsets(word, pos=wn.NOUN)
    syn = set()
    for s in synonyms:
            for l in s.lemmas():
                syn.add(l.name().replace('_',' '))
    syn = list(syn)
    
    return syn[:n]

def proces_sentence(sentence):
    sentence.lower()
    tokens = [t for t in sentence.split()]
    sr = stopwords.words('english')
    clean_tokens = tokens[:]
    for token in tokens:
        if token in sr:
            clean_tokens.remove(token)

    result = set()
    for token in clean_tokens:
        result = result.union(set(get_nouns(token, int(len(clean_tokens)/2))))
        result = result.union(set(get_verbs(token, int(len(clean_tokens)/2))))

    return list(reversed(list(result)))
    

# print(get_nouns("word"))
# print(get_verbs("word",2))

print(proces_sentence("I like singing songs that are loud"))


