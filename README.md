# serverless-video-upload

video upload and playback React website with Icoginito authorization using a Serverless architecture

## AWS Serverless Architeture
- Cognito AWS Service
- API Gateway
- DynamoDB
- S3
- Elastic Transcoder

## How to deploy and setup the project
1) Deploy user-auth-pool project
2) Setup icognito user pool in the AWS Console
3) Create a new Elastic Transcoder pipeline
4) Deploy the uploader service
5) Deploy the video-crud service

----------

## How to setup services locally

### Local DynamoDB
Download the local DynamoDB version: [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

Run the DynamoDB server using the port 8383: cd <path of local DynamoDB > java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8383

### GUI for DynamoDB Local
- `npm install dynamodb-admin -g`
- `export DYNAMO_ENDPOINT=http://localhost:8383`
- `dynamodb-admin`

More information [here]([here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html))
