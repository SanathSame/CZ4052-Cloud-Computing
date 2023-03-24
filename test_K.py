import numpy as np
from PIL import Image
import keras

im = Image.open("K.png", "r")
im = im.resize((28, 28))
# im.show()
im = im.convert("L")
# im.show()
im = np.asarray(im, dtype=np.float32) / 255
im = im.reshape((-1, 28, 28, 1))

loaded_model = keras.models.load_model("models/alphabet_model.h5")
print(np.argmax(loaded_model.predict(im)))
