import shutil, os 

for root, dirs, _ in os.walk("archive/frames"):
    for dir in dirs:
        subdirs = os.listdir(os.path.join(root, dir))
        subdirs = [subdir for subdir in subdirs if os.path.isdir(os.path.join(root, dir, subdir))]
        if len(subdirs):
            for subdir in subdirs:
                if not os.path.exists(os.path.join("archive/subdataset", dir)):
                    os.makedirs(os.path.join("archive/subdataset", dir))
                shutil.copyfile(os.path.join("archive/videos", subdir + ".mp4"), os.path.join("archive/subdataset", dir, subdir + ".mp4"))