'use strict';
const AWS = require('aws-sdk');

class UploaderService {
   constructor() {
    this.s3 = new AWS.S3({
      maxRetries: 10,
      s3ForcePathStyle: !!process.env.S3Endpoint ? true : false,
      endpoint: !!process.env.S3Endpoint ? process.env.S3Endpoint : undefined
    });
  }

  upload(fileName, contentType, body) {
    const params = {
      Bucket: process.env.fileUploaderS3BucketName,
      ContentType: contentType,
      Key: fileName, 
      Body: body
    };
  
    return this.s3.upload(params).promise();
  }
}

module.exports = UploaderService;