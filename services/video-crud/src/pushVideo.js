'use strict';
const DynamoDBService = require('./dynamodb.service');
const path = require('path');

module.exports.handler = async (event, context, callback) => {
  console.log('push-video-to-db.handler', 'process started');
  
  var key = decodeURI(event.Records[0].s3.object.key);
  var bucket = event.Records[0].s3.bucket.name;
  
  const displayName = path.basename(key);
  const dynamoDBService = new DynamoDBService();
  const data = await dynamoDBService.write(process.env.videosTableName, {
    displayName,
    key, 
    bucket, 
    createdAt: new Date().toISOString()
  });
  callback(null, data);
  console.log('push-video-to-db.handler', 'process completed');
}