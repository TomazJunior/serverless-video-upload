'use strict';
const AWS = require('aws-sdk');
const path = require('path');

class TranscoderService {
   constructor() {
    this.elasticTranscoder = new AWS.ElasticTranscoder({
      region: process.env.region
    });
  }

  async createJob(key) {
    const loggerTag = 'TranscoderService.createJob';
    console.log(loggerTag, 'process started');
    console.log(loggerTag, 'key:', key);
    const { name, ext } = path.parse(key);
    
    var params = {
      PipelineId: process.env.transcoderPipelineId,
      OutputKeyPrefix: name + '/',
      Input: {
        Key: key
      },
      Outputs: [
        {
          Key: `${name}-web-480p${ext}`,
          PresetId: '1351620000001-000020' //480p 16:9 format
        }
      ]
    };

    await this.elasticTranscoder.createJob(params).promise();
    console.log(loggerTag, 'process completed');
  }
}

module.exports = TranscoderService;
