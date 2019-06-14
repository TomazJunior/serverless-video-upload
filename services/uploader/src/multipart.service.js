'use strict';
const Busboy = require('busboy');
const { get, set } = require('lodash');
const { Writable } = require('stream');

module.exports.parseForm = (event) => new Promise((resolve, reject) => {
  if (!event || !event.body) { return resolve(event); }
  
  const contentType = getContentType(event);
  
  if (!contentType.includes('multipart/form-data')) { return resolve(event); }

  const busboy = new Busboy({
    headers: {
      'content-type': contentType
    }
  });

  const result = {};

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
     console.log(
      'File [' , fieldname , typeof fieldname, ']: filename: ' ,  filename, typeof filename , 
      ', encoding: ' ,  encoding , typeof encoding , 
      ', mimetype: ' , mimetype, typeof mimetype,
      ', file: ' , typeof file);
    file.on('data', (data) => {
      result.file = data;
    });

    file.on('end', () => {
      result.fileName = filename;
      result.mimeType = mimetype;
    });
  });

  busboy.on('field', (fieldname, value) => {
    result[fieldname] = value;
  });

  busboy.on('error', (error) => {
    reject(new Error(`Parse error: ${error.message}`));
  });

  busboy.on('finish', () => resolve(set(event, 'body', result)));

  busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
  
  busboy.end();
});

const getContentType = (event) => {
  // serverless offline is passing 'Content-Type', AWS is passing 'content-type'
  let contentType = get(event, 'headers.content-type');
  if (!contentType) { contentType = get(event, 'headers.Content-Type'); }

  return contentType;
};
