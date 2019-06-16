describe('S3 Service Test Suite', () => {

  function mockAWS(S3Implementation) {
    jest.mock('aws-sdk');
    const AWS = require('aws-sdk');
    AWS.S3 = S3Implementation;
    return AWS;
  }

  let service;
  let s3uploadStub;
  process.env.fileUploaderS3BucketName = 'file-uploader-data-local';
  describe('when it is running on AWS', () => {
    let AWS;
    beforeEach(() => {
      process.env.S3Endpoint = '';
      AWS = mockAWS(jest.fn().mockImplementation(() => {
        return {};
      }));
      const S3Service = require('./s3.service');
      service = new S3Service();
    });

    it('S3 should initialized without endpoint', () => {
      expect(AWS.S3).toBeCalledWith({
        maxRetries: 10,
        s3ForcePathStyle: false,
        endpoint: undefined
      });
      expect(AWS.S3).toHaveBeenCalledTimes(1);
    });
  });

  describe('when it is running locally', () => {
    let AWS;
    beforeEach(() => {
      process.env.S3Endpoint = 'http://localhost:8401';
      s3uploadStub = jest.fn().mockReturnValue({ promise: () => Promise.resolve() });
      const s3Stub = {
        upload: s3uploadStub
      };
      AWS = mockAWS(jest.fn().mockImplementation(() => {
        return s3Stub;
      }));
      const S3Service = require('./s3.service');
      service = new S3Service();      
    });

    it('S3 should initialized with endpoint', () => {
      expect(AWS.S3).toBeCalledWith({
        maxRetries: 10,
        s3ForcePathStyle: true,
        endpoint: process.env.S3Endpoint
      });
      expect(AWS.S3).toHaveBeenCalledTimes(1);
    });

    it('should call s3.upload with valid arguments', async () => {
      const args = {
        Bucket: process.env.fileUploaderS3BucketName,
        Key: 'file.mp4',
        Body: 'buffer',
        ContentType: 'video/mp4'
      };
      await service.upload(args.Key, args.ContentType, args.Body);
      expect(s3uploadStub).toBeCalledWith(args);
      expect(s3uploadStub).toHaveBeenCalledTimes(1);
    });
  });
});
