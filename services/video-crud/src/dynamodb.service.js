'use strict';
const AWS = require('aws-sdk');

class DynamoDBService {
  constructor() {
    const driver = {
      region: process.env.region,
      endpoint: process.env.dynamoDBEndpoint,
      accessKeyId: process.env.dynamoDBaccessKey,
      secretAccessKey: process.env.dynamoDBaccessSecret
    };
    console.log('DynamoDBService.ctor', driver);
    this.dynamoDB = new AWS.DynamoDB(driver);
    this.converter = AWS.DynamoDB.Converter;
  }

  async write(tableName, item) {
    const loggerTag = 'DynamoDBService.write';
    console.log(loggerTag, 'process started');
    console.log(loggerTag, 'tableName:', tableName);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: tableName,
        Item: this.converter.marshall(item)
      };
      this.dynamoDB.putItem(params, (err, data) => {
        if (err) { 
          console.log(loggerTag, 'tableName:', 'Failed writing item ' + err);
          reject(err);
        } else {
          resolve(data);
          console.log(loggerTag, 'process completed');
        }
      });
    });
  }

  async scan(tableName) {
    const loggerTag = 'DynamoDBService.scan';
    console.log(loggerTag, 'process started');
    console.log(loggerTag, 'tableName:', tableName);
    return new Promise((resolve, reject) => {
      const params = {
        TableName: tableName
      };
      var docClient = new AWS.DynamoDB.DocumentClient();

      this.dynamoDB.scan(params, (err, data) => {
        if (err) { 
          console.log(loggerTag, 'tableName:', 'Failed writing item ' + err);
          reject(err);
        } else {
          resolve(data.Items.map((item) => {
            return this.converter.unmarshall(item);
          }));
          console.log(loggerTag, 'process completed');
        }
      });
    });
  }
}

module.exports = DynamoDBService;
