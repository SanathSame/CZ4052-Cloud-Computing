import numpy as np
from PIL import Image
import keras
import os
import cv2

loaded_model = keras.models.load_model("models/alphabet_model.h5")

def detect_hands(img):
    hand = cv2.CascadeClassifier(cv2.data.haarcascades + 'aGest.xml') #Cascade Classifier for front-facing hands
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) #Converts image to grayscale
    hands = hand.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=1, minSize=(40,40), maxSize=(60,60)) #All detected hands get put into an array
    # img_hands = img[]
    if len(hands) != 0:        
        return hands
    else:
        return []

directories = []
for root, dirs, files in os.walk("archive\\frames"):
    if len(dirs) > 0: directories = dirs

all_files = []
for i, (root, dirs, files) in enumerate(os.walk("archive\\frames")):
    if files:
        all_files.extend([directories[i-1]+ '\\'+ f for f in files])

for im_path in all_files:
    im = cv2.imread(f"archive\\frames\\{im_path}")
    # im = im.resize((28, 28))
    # im.show()
    # im = im.convert("L")
    # im.show()
    # im = np.asarray(im, dtype=np.float32) / 255
    # im = im.reshape((-1, 28, 28, 1))
    
    hands = detect_hands(im)    
    print(im_path, hands)
    if len(hands) > 0: 
        print(hands)
        for hand in hands:
            cv2.rectangle(im, (hand[0], hand[1]), (hand[0] + hand[2], hand[1] + hand[3]), (0, 255, 0), thickness=2)
        cv2.imshow("Detected hands", im)
        cv2.waitKey(0)

    # pred_class = np.argmax(loaded_model.predict(im))
    # # print(pred_class)
    # if pred_class==22:
    #     print(im_path)

