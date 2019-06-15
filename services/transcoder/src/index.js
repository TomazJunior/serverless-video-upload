'use strict';
const TranscoderService = require('./transcoder.service');

module.exports.handler = async (event, context, callback) => {
  console.log('transcoder.handler', 'process started');
  var key = event.Records[0].s3.object.key;
  const transcoderService = new TranscoderService();
  const data = await transcoderService.createJob(key);
  callback(null, data);
  console.log('transcoder.handler', 'process completed');
}