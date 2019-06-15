'use strict';
const path = require('path');
const S3Service = require('./s3.service');
const atob = require('atob');

module.exports.handler = async (event, context, callback) => {
  console.log('retrieveSignedUrl.handler', 'process started');
  console.log('event:', event);
  const body = event.isBase64Encoded ? JSON.parse(atob(event.body)) : JSON.parse(event.body);
  console.log('body', body);
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
