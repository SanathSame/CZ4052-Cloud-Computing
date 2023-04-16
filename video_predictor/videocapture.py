import time

import numpy as np

import cv2


def video_capture(oStream, nTimeDuration = 3):
	liFrames = []
	fTimeStart = time.time()

	# loop over frames from the video file stream
	while True:
		# grab the frame from the threaded video file stream
		(success, arFrame) = oStream.read()
		if not success: break
		
		arFrame = cv2.resize(arFrame, (224, 224))
		arFrame = cv2.flip(arFrame, 1)
		cv2.imshow("Frames", arFrame)
		cv2.waitKey(1)
		liFrames.append(arFrame)

		fTimeElapsed = time.time() - fTimeStart

		# stop after nTimeDuration sec
		if fTimeElapsed >= nTimeDuration: break

	return fTimeElapsed, np.array(liFrames)