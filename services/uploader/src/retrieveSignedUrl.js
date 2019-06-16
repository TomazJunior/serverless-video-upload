'use strict';
const S3Service = require('./s3.service');

module.exports.handler = async (event, context, callback) => {
  console.log('retrieveSignedUrl.handler', 'process started');
  const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const {key, bucket} = body;
  
  const s3Service = new S3Service();
  const url = s3Service.getSignedUrl(bucket, key);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      url
    }),
  };
  console.log('retrieveSignedUrl.handler', 'process completed');
  callback(null, response);
};
