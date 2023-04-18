from model_i3d import I3D_load
import cv2
import time
import numpy as np

from videocapture import video_capture
from frame import (video2frames, images_normalize, frames_downsample, images_crop, 
                   images_resize_aspectratio, frames_show, frames2files, files2frames, video_length)
from opticalflow import frames2flows, flows2colorimages, flows2file, flows_add_third_channel
from predict import probability2label

N_FRAMES = 40
N_CLASSES = 20

def predict(url):
    sModelFile = "C:\\Users\\tejas\\Desktop\\NTU Stuff\\Y4S1\\Cloud Computing\\CZ4052-Cloud-Computing\\models\\20180627-0729-chalearn020-oflow-i3d-entire-best.h5"
    h, w = 224, 224
    keI3D = I3D_load(sModelFile, N_FRAMES, (h, w, 2), N_CLASSES)

    cap = cv2.VideoCapture(url)

    fElapsed, arFrames = video_capture(cap, nTimeDuration = 5)
    print("\nCaptured video: %.1f sec, %s, %.1f fps" % \
        (fElapsed, str(arFrames.shape), len(arFrames)/fElapsed))
    
    # crop and downsample frames
    arFrames = images_crop(arFrames, h, w)
    arFrames = frames_downsample(arFrames, N_FRAMES)

    # Translate frames to flows - these are already scaled between [-1.0, 1.0]
    print("Calculate optical flow on %d frames ..." % len(arFrames))
    start = time.time()
    arFlows = frames2flows(arFrames, bThirdChannel = False, bShow = True)
    print("Optical flow per frame: %.3f" % ((time.time()-start) / len(arFrames)))

    # predict video from flows			
    print("Predict video with %s ..." % (keI3D.name))
    arX = np.expand_dims(arFlows, axis=0)
    arProbas = keI3D.predict(arX, verbose = 1)[0]
    nLabel, sLabel, fProba = probability2label(arProbas, nTop = 3)
    sResults = "Sign: %s (%.0f%%)" % (sLabel, fProba*100.)
    print(sResults)
        
    cv2.destroyAllWindows()
    
    return

if __name__ == "__main__":
    input = "C:\\Users\\tejas\\Desktop\\NTU Stuff\\Y4S1\\Cloud Computing\\CZ4052-Cloud-Computing\\archive\\predict\\butterfly.mp4"
    predict(input)
