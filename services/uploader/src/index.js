'use strict';
const { parseForm } = require('./multipart.service');
const path = require('path');
const uuid = require('uuid');
const S3Service = require('./s3.service');

module.exports.handler = async (event, context, callback) => {
  console.log('uploader.handler', 'process started');
  const bucket = process.env.fileUploaderS3BucketName;
  await parseForm(event);
  
  const body = event.body;
  const id = uuid.v1();
  const extname = path.extname(body.fileName);
  const fileName = `${id}${extname}`;

  const s3Service = new S3Service();
  const data = await s3Service.upload(fileName, body.mimeType, body.file, {
    original: body.fileName
  });
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      ...data
    }),
  };

  console.log('uploader.handler', 'process completed');
  callback(null, response);
};
