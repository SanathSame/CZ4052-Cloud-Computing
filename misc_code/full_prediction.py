import numpy as np
from collections import Counter
import os
import cv2
import traceback
import matplotlib.pyplot as plt
from rembg import remove, new_session

import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
from show_hands import draw_landmarks_on_image

import tensorflow as tf

INPUT_SIZE = (28, 28, 3)
BG_COLOR = (0, 177, 64)

# Load mediapipe Hand Landmark Detector
with open('models/hand_landmarker.task', "rb") as f:
    base_options = python.BaseOptions(model_asset_buffer=f.read())
options = vision.HandLandmarkerOptions(base_options=base_options,
                                        num_hands=2,
                                        min_hand_detection_confidence=0.15, 
                                        min_hand_presence_confidence=0.1,
                                        min_tracking_confidence=0.15)
detector = vision.HandLandmarker.create_from_options(options)

session = new_session("u2netp")

# Load mediapipe Background Replacer
with open('models\deeplabv3.tflite', "rb") as f:
# with open('models\selfie_segm_128_128_3.tflite', "rb") as f:
    base_options = python.BaseOptions(model_asset_buffer=f.read())
options = vision.ImageSegmenterOptions(base_options=base_options,
                                        running_mode=vision.RunningMode.IMAGE,
                                        output_type=vision.ImageSegmenterOptions.OutputType.CATEGORY_MASK)
segmenter = vision.ImageSegmenter.create_from_options(options)

def bgremove4(img):
    output = remove(img, session=session)
    return output

def bgreplace(img, h, w):
    category_masks = segmenter.segment(img)
    image_data = img.numpy_view()
    bg_image = np.zeros(image_data.shape, dtype=np.uint8)
    bg_image[:] = BG_COLOR

    condition = np.stack((category_masks[0].numpy_view(),) * 3, axis=-1) > 0.99
    output_image = np.where(condition, image_data, bg_image)
    return output_image

def generate_frames(path):
    print(path)
    cap = cv2.VideoCapture(path)
    count = 1
    if not os.path.exists(f"archive\\predict\\frames"):
        os.makedirs(f"archive\\predict\\frames")
    while True:
        try:
            success, img = cap.read()
            image_cropped = img

            # image_cropped = bgremove4(image_cropped)
            # image_cropped = cv2.cvtColor(image_cropped, cv2.COLOR_RGBA2RGB)

            h, w, c = image_cropped.shape
            image_cropped = cv2.resize(image_cropped, (w,h))
            # print(image_cropped.shape)

            image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image_cropped)
            # image = bgreplace(image, h, w)
            # cv2.imshow("Bg replace", image)
            # cv2.waitKey(1)
            # image = mp.Image(image_format=mp.ImageFormat.SRGB, data=image)

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
                    image_save = image_cropped[y_min-25:y_max+25, x_min-25:x_max+25]
                    if not cv2.imwrite(f"archive\\predict\\frames\\{count}.jpg", image_save):
                        print(f"archive\\predict\\frames\\{count}.jpg")
                        print("Not saved")
                except:
                    print("Nothing")
            cv2.imshow("Detected hands", annotated_image)
            cv2.waitKey(1)
            count += 1
        except Exception:
            print(traceback.format_exc())
            break

def clean_frame_dirs():
    for root, dirs, files in os.walk("archive/predict/frames"):
        count_files = len(files)
        print("Count Files: {}".format(count_files))
        if count_files < 10:
            print("This directory is useless.")
            # Uncomment after unzip
            # shutil.rmtree(subsubroot)
        else:
            y = round(0.126 * count_files ** 1.0354)
            print("Need to remove first {} and last {} frames to be removed.".format(y, y))
            # print(files)
            file_nums = [int(file_name.replace(".jpg", "")) for file_name in files]
            file_nums = list(sorted(file_nums))
            useless_files = [str(file_num) + ".jpg" for file_num in (file_nums[:y] + file_nums[-y:])]

            for file in useless_files:
                print(os.path.join(root, file))
                # Uncomment after unzip
                os.remove(os.path.join(root, file))

def load(filename):
   np_image = cv2.imread(filename)
#    np_image = np.array(np_image).astype('float32')/255
   np_image = cv2.resize(np_image, INPUT_SIZE[:-1])
   np_image = np.expand_dims(np_image, axis=0)
   return np_image

def test_model():
    test_dir = "archive/predict/frames"
    norm_layer = tf.keras.layers.experimental.preprocessing.Rescaling(1/255.)
    model = tf.keras.models.load_model('models/simple_model2_size28_epoch15.h5')

    # Make predictions on the images in the folder
    preds = []
    for img_file in os.listdir(test_dir):
        img_path = os.path.join(test_dir, img_file)
        img = load(img_path)
        img = norm_layer(img)
        pred = model.predict(img)
        preds.append(np.argmax(pred))
        print(np.argmax(pred))

    # Count the occurrences of each predicted class
    counter = Counter(preds)

    # Retrieve the most common prediction
    most_common = counter.most_common(1)[0][0]
    print(most_common)

def cleanup():
    pass
        
if __name__ == "__main__":
#uncomment the following if json has not been parsed
    input = "archive/predict/a5.mp4"
    generate_frames(input)
    clean_frame_dirs()
    test_model()
    cleanup()
    pass
