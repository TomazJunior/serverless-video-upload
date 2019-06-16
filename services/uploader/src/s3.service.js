'use strict';
const AWS = require('aws-sdk');

class S3Service {
   constructor() {
    this.s3 = new AWS.S3({
      maxRetries: 10,
      s3ForcePathStyle: !!process.env.S3Endpoint ? true : false,
      endpoint: !!process.env.S3Endpoint ? process.env.S3Endpoint : undefined
    });
  }

  upload(fileName, contentType, body, metadata) {
    const params = {
      Bucket: process.env.fileUploaderS3BucketName,
      ContentType: contentType,
      Key: fileName, 
      Body: body,
      Metadata: metadata
    };
  
    return this.s3.upload(params).promise();
  }

  getSignedUrl(bucket, key) {
    var params = {
      Bucket: bucket, 
      Key: key,
      Expires: 3600 // expiration time in seconds (1h)
    };
    console.log('params', params);
    var url = this.s3.getSignedUrl('getObject', params);
    console.log('The URL is', url);
    return url;
  }
}

module.exports = S3Service;