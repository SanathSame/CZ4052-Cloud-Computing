import cv2
import time
import json
import os
import traceback

import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from show_hands import draw_landmarks_on_image

with open('models/hand_landmarker.task', "rb") as f:
        base_options = python.BaseOptions(model_asset_buffer=f.read())
options = vision.HandLandmarkerOptions(base_options=base_options,
                                    num_hands=2,
                                    min_hand_detection_confidence=0.15, 
                                    min_hand_presence_confidence=0.1,
                                    min_tracking_confidence=0.15)
detector = vision.HandLandmarker.create_from_options(options)

def generate_frames(instance):
    pTime = 0
    cTime = 0
    img_id = instance["video_id"]
    start = instance["frame_start"]
    end = instance["frame_end"]
    if end==-1: end = 250
    x1, y1, x2, y2 = instance["bbox"]
    path = "archive\\videos\\" + img_id + ".mp4"
    print(path)
    cap = cv2.VideoCapture(path)
    count = 1
    if not os.path.exists(f"archive\\frames\\{img_id}"):
        os.makedirs(f"archive\\frames\\{img_id}")
    while True:
        try:
            success, img = cap.read()
            if start <= count <= end:
                image_cropped = img[y1:y2, x1:x2]
                h, w, c = image_cropped.shape
                image_cropped = cv2.resize(image_cropped, (w, h))
                # image_cropped = cv2.resize(image_cropped, (400, int((h / w) * 400)))
                # h, w, c = image_cropped.shape
                image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_cropped)
                results = detector.detect(image)
                annotated_image = draw_landmarks_on_image(image.numpy_view(), results)
                if results.hand_landmarks:
                    x_max = 0
                    y_max = 0
                    x_min = w
                    y_min = h
                    for handLms in results.hand_landmarks:
                        for id, lm in enumerate(handLms):
                            cx, cy = int(lm.x *w), int(lm.y*h)
                            x_max = max(cx, x_max)
                            y_max = max(cy, y_max)
                            x_min = min(cx, x_min)
                            y_min = min(cy, y_min)

                    
                    cv2.rectangle(annotated_image, (x_min-10, y_min-10), (x_max+10, y_max+10), (0, 255, 0), 2)
                        
                    try:
                        image_save = image_cropped[y_min-10:y_max+10, x_min-10:x_max+10]
                        cv2.imshow("hand", image_save)
                        if not cv2.imwrite(f"archive\\frames\\{img_id}\\{count}.jpg", image_save):
                            print(f"archive\\frames\\{id}\\{count}{time.time()}.jpg")
                            print("Not saved")
                    except:
                        print("Nothing")

                cTime = time.time()
                fps = 1/(cTime-pTime)
                pTime = cTime

                cv2.putText(annotated_image,str(int(fps)), (10,70), cv2.FONT_HERSHEY_PLAIN, 3, (255,0,255), 3)

                cv2.imshow("Detected hands", annotated_image)
                cv2.waitKey(1)
            count += 1
        except Exception:
            print(traceback.format_exc())
            break