from flask import Flask, request
# from final_prediction import predict
# import numpy as np
from dotenv import load_dotenv
import os
import boto3
import faulthandler

faulthandler.enable()

# load_dotenv()

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home():
    return {
        "message": "Hello world"
    }

@app.route("/predict", methods=["GET"])
def prediction():
    # S3_key = request.json("S3_key")
    S3_key = 'protected/ap-southeast-1:53fef940-a158-4bca-8d0f-398f685a401f/E_1681639063372.mp4'
    bucket = os.environ.get("BUCKET_NAME")
    print(bucket)
    s3 = boto3.client('s3')
    url = s3.generate_presigned_url('get_object', 
                                       Params = {'Bucket': bucket, 'Key': S3_key}, 
                                       ExpiresIn = 600) 
    # print(S3_key)
    # obj = s3.Object(bucket, S3_key)
    # predict(url)
    return {
        "prediction_class": "butterfly"
    }

@app.route("/test_bucket_access", methods=["GET"])
def test_access():
    bucket = os.environ.get("BUCKET_NAME")
    s3 = boto3.client('s3')
    result = s3.list_objects(Bucket = bucket, Prefix='protected/ap-southeast-1:53fef940-a158-4bca-8d0f-398f685a401f/')
    i = 1
    for o in result.get('Contents'):
        data = s3.get_object(Bucket=bucket, Key=o.get('Key'))
        contents = data['Body'].read()
        i += 1
    print("Read {} elements".format(i))
    return {
        "bucket_access": "successful"
    }
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)