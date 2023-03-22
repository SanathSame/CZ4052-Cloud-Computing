# %%
# starter code for ML model; adapted from https://www.kaggle.com/code/madz2000/cnn-using-keras-100-accuracy
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns
import keras
from keras.models import Sequential
from keras.layers import Dense, Conv2D , MaxPool2D , Flatten , Dropout , BatchNormalization
from keras.preprocessing.image import ImageDataGenerator
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report,confusion_matrix
from sklearn.preprocessing import LabelBinarizer
from keras.callbacks import ReduceLROnPlateau

# %%
train_df = pd.read_csv(r"C:\Users\Siddharth\Desktop\NTU COURSE STUFF\Y4S2\CE4052\Project\Data\sign_mnist_test\sign_mnist_test.csv")
test_df = pd.read_csv(r"C:\Users\Siddharth\Desktop\NTU COURSE STUFF\Y4S2\CE4052\Project\Data\sign_mnist_train\sign_mnist_train.csv")
# %%
y_train = train_df['label']
y_test = test_df['label']
del train_df['label']
del test_df['label']
# %%
label_binarizer = LabelBinarizer()
y_train = label_binarizer.fit_transform(y_train)
y_test = label_binarizer.fit_transform(y_test) 
# %%
x_train = train_df.values
x_test = test_df.values
# Normalization
x_train = x_train / 255.0
x_test = x_test / 255.0
# Reshape
x_train = x_train.reshape(-1,28,28,1)
x_test = x_test.reshape(-1,28,28,1)
# %%
# Preview images
f, ax = plt.subplots(2,5) 
f.set_size_inches(10, 10)
k = 0
for i in range(2):
    for j in range(5):
        ax[i,j].imshow(x_train[k].reshape(28, 28) , cmap = "gray")
        k += 1
    plt.tight_layout() 
# %%
# Augmentation
datagen = ImageDataGenerator(
        featurewise_center=False,  # set input mean to 0 over the dataset
        samplewise_center=False,  # set each sample mean to 0
        featurewise_std_normalization=False,  # divide inputs by std of the dataset
        samplewise_std_normalization=False,  # divide each input by its std
        zca_whitening=False,  # apply ZCA whitening
        rotation_range=10,  # randomly rotate images in the range (degrees, 0 to 180)
        zoom_range = 0.1, # Randomly zoom image 
        width_shift_range=0.1,  # randomly shift images horizontally (fraction of total width)
        height_shift_range=0.1,  # randomly shift images vertically (fraction of total height)
        horizontal_flip=False,  # randomly flip images
        vertical_flip=False)  # randomly flip images


datagen.fit(x_train)
# %%
learning_rate_reduction = ReduceLROnPlateau(monitor='val_accuracy', patience = 2, verbose=1,factor=0.5, min_lr=0.00001)
# %%
model = Sequential()
model.add(Conv2D(75 , (3,3) , strides=1 , padding='same' , activation='relu' , input_shape=(28,28,1)))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides=2 , padding='same'))
model.add(Conv2D(50 , (3,3) , strides=1 , padding='same' , activation='relu'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides=2 , padding='same'))
model.add(Conv2D(25 , (3,3) , strides=1 , padding='same' , activation='relu'))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides=2 , padding='same'))
model.add(Flatten())
model.add(Dense(units=512 , activation='relu'))
model.add(Dropout(0.3))
model.add(Dense(units=24 , activation='softmax'))
model.compile(optimizer='adam' , loss='categorical_crossentropy' , metrics=['accuracy'])
model.summary()
# %%
history = model.fit(datagen.flow(x_train, y_train, batch_size=128), epochs=20, validation_data=(x_test, y_test), callbacks=[learning_rate_reduction])
# %%
print("Accuracy of the model is - " , model.evaluate(x_test,y_test)[1]*100 , "%")
# %%
predict_x = model.predict(x_test) 
predictions = np.argmax(predict_x, axis=1)
for i in range(len(predictions)):
    if(predictions[i] >= 9):
        predictions[i] += 1
predictions[:5]   
# %%
test = pd.read_csv(r"C:\Users\Siddharth\Desktop\NTU COURSE STUFF\Y4S2\CE4052\Project\Data\sign_mnist_train\sign_mnist_train.csv")
y = test['label']
# %%
classes = ["Class " + str(i) for i in range(25) if i != 9]
print(classification_report(y, predictions, target_names = classes))
# %%
cm = confusion_matrix(y,predictions)
cm = pd.DataFrame(cm , index = [i for i in range(25) if i != 9] , columns = [i for i in range(25) if i != 9])
plt.figure(figsize = (15,15))
sns.heatmap(cm,cmap= "Blues", linecolor = 'black' , linewidth = 1 , annot = True, fmt='')
# %%
y = y.to_numpy()
# %%
correct = np.nonzero(predictions == y)[0]
# %%
i = 0
for c in correct[10:16]:
    plt.subplot(3,2,i+1)
    plt.imshow(x_test[c].reshape(28,28), cmap="gray", interpolation='none')
    plt.title("Predicted Class {},Actual Class {}".format(predictions[c], y[c]))
    # plt.tight_layout()
    i += 1
# %%
