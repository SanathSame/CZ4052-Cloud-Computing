import json
import pandas as pd
from random import shuffle

import new_mediapipe_hands

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

if __name__ == "__main__":
#uncomment the following if json has not been parsed
    df, gloss_list  = parse_json()
    training_df = get_training_subset(df)
    for index, row in training_df.iterrows():
        new_mediapipe_hands.generate_frames(row)
