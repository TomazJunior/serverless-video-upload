'use strict';
const TranscoderService = require('./transcoder.service');

module.exports.handler = async (event, context, callback) => {
  console.log('transcoder.handler', 'process started');
  const key = event.Records[0].s3.object.key;
  const bucket = event.Records[0].s3.bucket.name;
  const transcoderService = new TranscoderService();
  const data = await transcoderService.createJob(bucket, key);
  callback(null, data);
  console.log('transcoder.handler', 'process completed');
}