'use strict';
const DynamoDBService = require('./dynamodb.service');

module.exports.handler = async (event, context, callback) => {
  console.log('push-video-to-db.handler', 'process started');
  
  var key = event.Records[0].s3.object.key;
  var bucket = event.Records[0].s3.bucket.name;
  
  console.log('push-video-to-db.handler', {...event.Records[0].s3.object});

  const dynamoDBService = new DynamoDBService();
  const data = await dynamoDBService.write(process.env.videosTableName, { key, bucket, createdAt: new Date().toISOString()});
  callback(null, data);
  console.log('push-video-to-db.handler', 'process completed');
}