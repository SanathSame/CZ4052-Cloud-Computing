import cv2
import mediapipe as mp
import time
import json


mpHands = mp.solutions.hands
hands = mpHands.Hands(static_image_mode=False,
                      max_num_hands=2,
                      min_detection_confidence=0.1,
                      min_tracking_confidence=0.1)
mpDraw = mp.solutions.drawing_utils

pTime = 0
cTime = 0

with open("j.json", 'r') as f:
        metadata = json.load(f)
with open("archive\\missing.txt", 'r') as f:
    missing = f.read().splitlines()

for instance in metadata["instances"]:
    if instance["video_id"] not in missing:
        id = instance["video_id"]
        start = instance["frame_start"]
        end = instance["frame_end"]
        if end==-1: end = 250
        x1, y1, x2, y2 = instance["bbox"]
        path = "archive\\videos\\" + id + ".mp4"
        print(path)
        cap = cv2.VideoCapture(path)
        count = 1
        while True:
            try:
                success, img = cap.read()
                if start <= count <= end:
                    image_cropped = img[y1:y2, x1:x2]
                    # imgRGB = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
                    results = hands.process(image_cropped)
                    # print(results.multi_hand_landmarks)
                    if results.multi_hand_landmarks:
                        for handLms in results.multi_hand_landmarks:
                            for id, lm in enumerate(handLms.landmark):
                                #print(id,lm)
                                h, w, c = image_cropped.shape
                                cx, cy = int(lm.x *w), int(lm.y*h)
                                #if id ==0:
                                cv2.circle(image_cropped, (cx,cy), 3, (255,0,255), cv2.FILLED)

                            mpDraw.draw_landmarks(image_cropped, handLms, mpHands.HAND_CONNECTIONS)

                    cTime = time.time()
                    fps = 1/(cTime-pTime)
                    pTime = cTime

                    cv2.putText(image_cropped,str(int(fps)), (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (255,0,255), 3)

                    cv2.imshow("Detected hands", image_cropped)
                    cv2.waitKey(1)
                count += 1
            except:
                break