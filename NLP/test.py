# import time
# from nltk.corpus import wordnet  


# while True:
# 	synonyms = []
# 	antonyms = []

# 	word = input("Pass the word: ")

# 	for syn in wordnet.synsets(word+'.v'):
# 		for l in syn.lemmas():
# 			synonyms.append(l.name())
# 			if l.antonyms():
# 				antonyms.append(l.antonyms()[0].name())

# 	print(set(synonyms))
# 	print(set(antonyms))
import json

tab = [1,2,3,4]

data = {
	"words":tab
}
print(json.dumps(data))
