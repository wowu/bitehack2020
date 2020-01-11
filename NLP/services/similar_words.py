from nltk.corpus import wordnet as wn

def get_verbs(word, n=5):
    synonyms = wn.synsets(word, pos=wn.VERB)
    syn = set()
    for s in synonyms:
            for l in s.lemmas():
                syn.add(l.name())
    return list(syn)[:n]

def get_nouns(word, n=5):
    synonyms = wn.synsets(word, pos=wn.NOUN)
    syn = set()
    for s in synonyms:
            for l in s.lemmas():
                syn.add(l.name())
    syn = list(syn)
    
    return syn[:n]

print(get_nouns("word"))
print(get_verbs("word",2))

