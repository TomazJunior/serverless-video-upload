# serverless-video-upload

1) Deploy user-auth-pool project
1) Setup icognito user pool
2) Setup Elastic Transcoder pipeline

## Local DynamoDB
Download the local DynamoDB version: [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

Run the DynamoDB server using the port 8383: cd <path of local DynamoDB > java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8383

## GUI for DynamoDB Local
- `npm install dynamodb-admin -g`
- `export DYNAMO_ENDPOINT=http://localhost:8383`
- `dynamodb-admin`

More information [here]([here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html))
