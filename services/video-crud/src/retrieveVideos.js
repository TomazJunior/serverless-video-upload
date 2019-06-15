'use strict';
const DynamoDBService = require('./dynamodb.service');

module.exports.handler = async (event, context, callback) => {
  console.log('retrieve-videos-from-db.handler', 'process started');
  const dynamoDBService = new DynamoDBService();
  const data = await dynamoDBService.scan(process.env.videosTableName);
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };

  callback(null, response);
  console.log('retrieve-videos-from-db.handler', 'process completed');
}