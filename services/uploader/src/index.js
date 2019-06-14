'use strict';
const { parseForm } = require('./multipart.service');
const path = require('path');
const uuid = require('uuid');
const UploaderService = require('./uploader.service');

module.exports.handler = async (event, context, callback) => {
  const bucket = process.env.fileUploaderS3BucketName;
  await parseForm(event);
  
  const body = event.body;
  const id = uuid.v1();
  const extname = path.extname(body.fileName);
  const fileName = `${id}${extname}`;

  const uploaderService = new UploaderService();
  const data = await uploaderService.upload(fileName, body.mimeType, body.file);
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      ...data
    }),
  };

  callback(null, response);
};
