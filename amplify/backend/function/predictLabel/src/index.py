import json
import os 
import cv2
import boto3

def handler(event, context):
  print('received event:')
  print(event)
  s3 = boto3.client('s3')
  bucket = os.environ.get	('STORAGE_S3SIGNSENSEISTORAGE422827EE_BUCKETNAME')
  print(bucket)
  result = s3.list_objects(Bucket = bucket, Prefix='protected/ap-southeast-1:53fef940-a158-4bca-8d0f-398f685a401f/')
  for o in result.get('Contents'):
    data = s3.get_object(Bucket=bucket, Key=o.get('Key'))
    contents = data['Body'].read()
    print(contents.decode("utf-8"))
 
  
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Hello from your new Amplify Python lambda!')
  }