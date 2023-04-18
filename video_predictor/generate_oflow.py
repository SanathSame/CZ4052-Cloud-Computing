"""
https://github.com/FrederikSchorr/sign-language

Assume videos are stored: 
... sVideoDir / train / class001 / gesture0027.mp4
... sVideoDir / val   / class249 / gesture1069.avi

This pipeline
* extracts frames=images from videos (training + validation)
* calculates optical flow
* trains an I3D neural network
"""

import os
import glob
import sys
import warnings

import numpy as np
import pandas as pd

from frame import videosDir2framesDir
from opticalflow import framesDir2flowsDir
from datagenerator import VideoClasses
from model_i3d import Inception_Inflated3d, Inception_Inflated3d_Top
from constants import *

# Image and/or Optical flow pipeline
bImage = False
bOflow = True

# dataset
"""diVideoSet = {"sName" : "ledasila",
    "nClasses" : 21,   # number of classes
    "nFramesNorm" : 40,    # number of frames per video
    "nMinDim" : 240,   # smaller dimension of saved video-frames
    "tuShape" : (288, 352), # height, width
    "nFpsAvg" : 25,
    "nFramesAvg" : 75,
    "fDurationAvg" : 3.0} # seconds
"""

diVideoSet = {"sName" : "chalearn",
    "nClasses" : 249,   # number of classes
    "nFramesNorm" : 40,    # number of frames per video
    "nMinDim" : 240,   # smaller dimension of saved video-frames
    "tuShape" : (240, 320), # height, width
    "nFpsAvg" : 10,
    "nFramesAvg" : 50, 
    "fDurationAvg" : 5.0} # seconds 

# directories
# sFolder = "%03d-%d"%(diVideoSet["nClasses"], diVideoSet["nFramesNorm"])
sClassFile       = "archive/training_subset.csv"
sVideoDir        = "archive/videos_labeled"
sImageDir        = "archive/data-temp/image"
sOflowDir        = "archive/data-temp/oflow"

print("Starting I3D pipeline ...")
print(os.getcwd())

# extract frames from videos
if bImage or bOflow:
    videosDir2framesDir(sVideoDir, sImageDir, nFramesNorm = N_FRAMES,
        nResizeMinDim = MIN_DIM, tuCropShape = None)

# calculate optical flow
if bOflow:
    framesDir2flowsDir(sImageDir, sOflowDir, nFramesNorm = N_FRAMES)

# train I3D network(s)
if bOflow:
    print("Now train...")
    # train_I3D_oflow_end2end(diVideoSet)
elif bImage:
    raise ValueError("I3D training with only image data not implemented")

# the end