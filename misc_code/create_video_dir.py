import pandas as pd
import shutil
import os

df_train = pd.read_csv('archive/training_subset.csv')

for i, row in df_train.iterrows():
    gloss = row['gloss']
    vid_id = f"{row['video_id']:05d}"

    if not os.path.exists(f"archive/videos_labeled/{gloss}"):
        os.makedirs(f"archive/videos_labeled/{gloss}")
        
    shutil.copyfile(f"archive/videos/{vid_id}.mp4", \
                    f"archive/videos_labeled/{gloss}/{vid_id}.mp4")
