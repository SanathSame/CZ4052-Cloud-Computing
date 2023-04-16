import json
import os
import shutil
from random import choice, shuffle

import cv2
import keras
import numpy as np
import pandas as pd
import tensorflow as tf
from keras import Model
from keras.applications import ResNet50
from keras.layers import (LSTM, Activation, Add, AveragePooling2D,
                          BatchNormalization, Conv2D, Conv3D, Dense, Dropout, Flatten,
                          GlobalAveragePooling2D, GlobalMaxPooling2D, Input,
                          Lambda, MaxPool2D, MaxPooling2D, MaxPooling3D, TimeDistributed,
                          concatenate, Rescaling)
from keras.models import Sequential
from keras.preprocessing.image import ImageDataGenerator
from PIL import Image

import new_mediapipe_hands

INPUT_SIZE = (28, 28, 3)

def parse_json(): #converts the json file into a pandas datatype
    
    
    jsonpath = "archive/WLASL_v0.3.json"#json path
    
    #open json file as list of dictionaries
    with open(jsonpath) as data_file:    
        data = json.load(data_file)  

    with open("archive\\missing.txt", 'r') as f:
        missing = f.read().splitlines()
        
    header = ["gloss"]
    

    datakey = data[0]["instances"][0].keys() #create the column heads 
    for h in datakey:
        header.append(h)
    
    gloss_list = [d["gloss"] for d in data] #get list of glosses
    dict_data = []
    
    #iterate every gloss in the list and apend every video of that gloss
    for i in range(len(gloss_list)):
        gloss = gloss_list[i]
        instances = data[i]["instances"] #list of instances
        for j in range(len(instances)): #iterate over every instance
            if instances[j]["video_id"] not in missing:
                entry = {"gloss": gloss} | instances[j] 
                dict_data.append(entry)
    df = pd.DataFrame.from_records(dict_data)
    df.to_csv("archive/WLASL.csv", index=False)
    return (df, gloss_list)

def get_training_subset(df):
    words = df["gloss"].unique()
    shuffle(words)
    letters = [chr(97 + i) for i in range(26)]
    numbers = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    df_temp = pd.DataFrame()
    # for word in words[:20]:
    #     df_temp = pd.concat([df_temp, df[df["gloss"] == word]])
    for letter in letters[:20]:
        df_temp = pd.concat([df_temp, df[df["gloss"] == letter]])
    for number in numbers[:20]:
        df_temp = pd.concat([df_temp, df[df["gloss"] == number]])
    df_temp.to_csv("archive/training_subset.csv", index=False)
    return df_temp

def clean_frame_dirs():
    for root, dirs, _ in os.walk("archive/frames"):
        for dir in dirs:
            for subroot, subdirs, _ in os.walk(os.path.join(root, dir)):
                for subdir in subdirs:
                    for subsubroot, _, files in os.walk(os.path.join(subroot, subdir)):
                        count_files = len(files)
                        print("Directory {}".format(subsubroot))
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
                            # print(useless_files)
                            for file in useless_files:
                                print(os.path.join(subsubroot, file))
                                # Uncomment after unzip
                                # os.remove(os.path.join(subsubroot, file))

def get_test():
    for root, dirs, _ in os.walk("archive/frames"):
        for dir in dirs:
            subdirs = os.listdir(os.path.join(root, dir))
            subdirs = [subdir for subdir in subdirs if os.path.isdir(os.path.join(root, dir, subdir))]
            if len(subdirs):
                print(subdirs)
                test_dir = choice(subdirs)
                print(test_dir)
                for file in os.listdir(os.path.join(root, dir, test_dir)):
                    print("Src: {}".format(os.path.join(root, dir, test_dir, file)))
                    print("Dst: {}".format(os.path.join("archive/split/test", dir, test_dir + "_" + file)))
                    if not os.path.exists(os.path.join("archive/split/test", dir)):
                        os.makedirs(os.path.join("archive/split/test", dir))
                    os.symlink(os.path.abspath(os.path.join(root, dir, test_dir, file)), os.path.join("archive/split/test", dir, test_dir + "_" + file))

            # print(os.path.join(subroot, test_dir))
                # for subdir in subdirs:

def get_train():
    split_test_dirs = os.listdir("archive/split/test")
    for root, dirs, _ in os.walk("archive/frames"):
        for dir in dirs:
            subdirs = os.listdir(os.path.join(root, dir))
            subdirs = [subdir for subdir in subdirs if os.path.isdir(os.path.join(root, dir, subdir))]
            if len(subdirs):
                # print(subdirs)
                for subdir in subdirs:
                    if subdir not in split_test_dirs:
                        for file in os.listdir(os.path.join(root, dir, subdir)):
                            print("Src: {}".format(os.path.join(root, dir, subdir, file)))
                            print("Dst: {}".format(os.path.join("archive/split/train", dir, subdir + "_" + file)))
                            if not os.path.exists(os.path.join("archive/split/train", dir)):
                                os.makedirs(os.path.join("archive/split/train", dir))
                            os.symlink(os.path.abspath(os.path.join(root, dir, subdir, file)), os.path.join("archive/split/train", dir, subdir + "_" + file))

def get_2_stream_cnn_model(INPUT_SIZE):
    # define spatial input stream
    spatial_input = Input(shape=INPUT_SIZE)
    x = Conv2D(32, (3, 3), activation='relu')(spatial_input)
    x = MaxPooling2D((2, 2))(x)
    x = Dropout(0.25)(x)
    x = Flatten()(x)
    x = Dense(64, activation='relu')(x)
    x = Dropout(0.5)(x)
    spatial_output = Dense(28, activation='softmax')(x)

    # define temporal input stream
    temporal_input = Input(shape=(5, *INPUT_SIZE))
    x = Conv3D(32, (3, 3, 3), activation='relu')(temporal_input)
    x = MaxPooling3D((2, 2, 2))(x)
    x = Dropout(0.25)(x)
    x = Flatten()(x)
    x = Dense(64, activation='relu')(x)
    x = Dropout(0.5)(x)
    temporal_output = Dense(28, activation='softmax')(x)

    # concatenate spatial and temporal streams
    merged = concatenate([spatial_output, temporal_output])

    # create the model
    model = Model(inputs=[spatial_input, temporal_input], outputs=merged)    
    return model

def train_model():
    train_dir = "archive/split/train"
    
    spatial_data_gen = ImageDataGenerator(preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input, validation_split=0.2)
    temporal_data_gen = ImageDataGenerator(preprocessing_function=tf.keras.applications.mobilenet_v2.preprocess_input, validation_split=0.2)

    # Create the spatial and temporal data sets
    train_spatial_data_set = spatial_data_gen.flow_from_directory(
        train_dir,
        target_size=INPUT_SIZE[:-1],
        batch_size=32,
        class_mode='categorical',
        shuffle=True,
        subset='training',
        seed=42        
    )
    val_spatial_data_set = spatial_data_gen.flow_from_directory(
        train_dir,
        target_size=INPUT_SIZE[:-1],
        batch_size=32,
        class_mode='categorical',
        shuffle=True,
        subset='validation',
        seed=42       
    )
    train_temporal_data_set = temporal_data_gen.flow_from_directory(
        train_dir,
        target_size=INPUT_SIZE[:-1],
        batch_size=32*5,
        class_mode='categorical',
        shuffle=True,
        subset='training',
        seed=42
    )
    val_temporal_data_set = temporal_data_gen.flow_from_directory(
        train_dir,
        target_size=INPUT_SIZE[:-1],
        batch_size=32*5,
        class_mode='categorical',
        shuffle=True,
        subset='validation',
        seed=42
    )

    model = get_2_stream_cnn_model(INPUT_SIZE)
    model.compile(loss='categorical_crossentropy',
              optimizer=keras.optimizers.SGD(learning_rate=0.05, momentum=0.9),
              metrics=['accuracy'])
    model.summary()
    callback = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=5)
    checkpoint = tf.keras.callbacks.ModelCheckpoint('models/tmp/checkpoint', monitor='val_accuracy', save_best_only=True)
    history = model.fit_generator(zip(train_spatial_data_set, train_temporal_data_set),
                        epochs=10,
                        verbose=1,
                        steps_per_epoch=len(train_spatial_data_set),
                        validation_data=(val_spatial_data_set, val_temporal_data_set),
                        validation_steps=len(val_spatial_data_set),
                        callbacks=[checkpoint, callback])
    model.save("models/2_stream_cnn.h5")

def test_model():
    test_dir = "archive/split/test"
    test_dataset = tf.keras.preprocessing.image_dataset_from_directory(test_dir,
                                                                    labels='inferred',
                                                                  label_mode='categorical',
                                                                  batch_size=32,
                                                                  image_size=INPUT_SIZE[:-1])
    print({k: label for k, label in enumerate(test_dataset.class_names)})
    # print(test_dataset.class_indices)

    norm_layer = tf.keras.layers.experimental.preprocessing.Rescaling(1/255.)

    norm_test_dataset = test_dataset.map(lambda x, y: (norm_layer(x), y))

    # for batch_X, batch_y in test_dataset.take(1):
    #     print(batch_X.shape)
    #     print(batch_y.shape)

    # image = load("archive/split/test/a/01610_75.jpg")
    # cv2.imshow("test_image", image)
    # cv2.waitKey(0)

    model = tf.keras.models.load_model('models/simple_video_model.h5')
    test_pred = model.predict(norm_test_dataset)

    # print("Prediction:", test_pred)

    res = [np.argmax(probs) for probs in test_pred]
    print("Result argmax:", res)
    print("Length:", len(test_pred[0]), len(test_pred))
    print("Unique:", np.unique(res))
    np.savetxt('results.txt', test_pred)

    score = model.evaluate(norm_test_dataset, verbose = 1) 

    print('Test loss:', score[0]) 
    print('Test accuracy:', score[1])

        
if __name__ == "__main__":
#uncomment the following if json has not been parsed
    # df, gloss_list  = parse_json()
    # training_df = get_training_subset(df)
    # for index, row in training_df.iterrows():
    #     new_mediapipe_hands.generate_frames(row)
    # print(os.readlink("archive/split/train/a/01610_63.jpg"))
    # clean_frame_dirs()
    # get_test()
    # get_train()
    train_model()
    # test_model()
    pass
