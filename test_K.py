import numpy as np
from PIL import Image
import keras
import os
import cv2

loaded_model = keras.models.load_model("models/alphabet_model.h5")

def detect_hands(img):
    hand = cv2.CascadeClassifier(cv2.data.haarcascades + 'palm.xml') #Cascade Classifier for front-facing hands
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) #Converts image to grayscale
    hands = hand.detectMultiScale(gray, scaleFactor=1.6, minNeighbors=5) #All detected hands get put into an array
    if len(hands) != 0:        
        return hands
    else:
        return False

directories = []
for root, dirs, files in os.walk("archive\\frames"):
    if len(dirs) > 0: directories = dirs

all_files = []
for i, (root, dirs, files) in enumerate(os.walk("archive\\frames")):
    if files:
        all_files.extend([directories[i-1]+ '\\'+ f for f in files])

for im_path in all_files:
    im = Image.open(f"archive\\frames\\{im_path}", "r")
    # im = im.resize((28, 28))
    # im.show()
    # im = im.convert("L")
    # im.show()
    im = np.asarray(im, dtype=np.float32) / 255
    # im = im.reshape((-1, 28, 28, 1))
    
    hands = detect_hands(im)    
    if hands: 
        print(hands)
        im.show()

    # pred_class = np.argmax(loaded_model.predict(im))
    # # print(pred_class)
    # if pred_class==22:
    #     print(im_path)

