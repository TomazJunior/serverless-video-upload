'use strict';
const AWS = require('aws-sdk');
const path = require('path');

class TranscoderService {
  constructor() {
    this.elasticTranscoder = new AWS.ElasticTranscoder({
      region: process.env.region
    });
    this.s3 = new AWS.S3({
      maxRetries: 10,
      s3ForcePathStyle: false
    });
  }

  async createJob(bucket, key) {
    const loggerTag = 'TranscoderService.createJob';
    console.log(loggerTag, 'process started');
    console.log(loggerTag, 'key:', key);
    const { name, ext } = path.parse(key);
    
    const metadata = await this.getObjectMetadata(bucket, key);
    let fileName = '';
    // store the original file name in the metadata to be added in the the dynamodb table
    if (metadata['original']) {
      fileName = path.parse(metadata['original']).name + ext;
    } else {
      fileName = `${name}${ext}`
    }
    
    // remove empty spaces
    fileName = decodeURI(fileName.replace(/\s/g, ''));
    var params = {
      PipelineId: process.env.transcoderPipelineId,
      OutputKeyPrefix: name + '/',
      Input: {
        Key: key
      },
      Outputs: [
        {
          Key: fileName,
          // list of presets: https://docs.aws.amazon.com/elastictranscoder/latest/developerguide/system-presets.html
          PresetId: '1351620000001-000020' //480p 16:9 format
        }
      ]
    };

    await this.elasticTranscoder.createJob(params).promise();
    console.log(loggerTag, 'process completed');
  }

  async getObjectMetadata(bucket, key) {
    const params = {
      Bucket: bucket, 
      Key: key,
      Range: "bytes=0-9"
    };
    const data = await this.s3.getObject(params).promise();
    return data.Metadata;
  }

}

module.exports = TranscoderService;
