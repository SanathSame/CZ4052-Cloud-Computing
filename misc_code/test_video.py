# Program To Read video
# and Extract Frames
  
import cv2
import json
import os
  
# Function to extract frames
def FrameCapture(path, id, start, end, x1, y1, x2, y2):
  
    # Path to video file
    vidObj = cv2.VideoCapture(path)
  
    # Used as counter variable
    count = 1
  
    # checks whether frames were extracted
    success = 1
  
    if not os.path.exists(f"archive\\frames\\{id}"):
        os.makedirs(f"archive\\frames\\{id}")
    
    while count < 260:
  
        # vidObj object calls read
        # function extract frames
        success, image = vidObj.read()
        if not success: break
        
        image_cropped = image[y1:y2, x1:x2]
        if count==1: pass
            # cv2.imshow('image', image)
            # cv2.imshow('image_cropped', image_cropped)
            # cv2.waitKey(0)
            # print( len(image), len(image[0]))
            # print( len(image_cropped), len(image_cropped[0]))
            # print(x1, y1, x2, y2)

        # Saves the frames with frame-count
        if start <= count <= end:
            cv2.imwrite(f"archive\\frames\\{id}\\{count}.jpg", image_cropped)
  
        count += 1
  
  
# Driver Code
if __name__ == '__main__':
  
    with open("a.json", 'r') as f:
        metadata = json.load(f)
    with open("archive\\missing.txt", 'r') as f:
        missing = f.read().splitlines()

    for instance in metadata["instances"]:
        if instance["video_id"] not in missing:
            id = instance["video_id"]
            fps = instance["fps"]
            start = instance["frame_start"]
            end = instance["frame_end"]
            if end==-1: end = 250
            path = "archive\\videos\\" + id + ".mp4"
            x1, y1, x2, y2 = instance["bbox"]
            print(path)

            FrameCapture(path, id, start, end, x1, y1, x2, y2)
