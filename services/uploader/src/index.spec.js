
jest.mock('./s3.service');
const S3Service = require('./s3.service');

jest.mock('./multipart.service');
const MultipartService = require('./multipart.service');
MultipartService.parseForm = jest.fn().mockResolvedValue({});

describe('Index Handler Test Suite', () => {
  let handler;
  const expectedUploadData = {
    key: 'de3f35f0-8fc3-11e9-8e09-e769aacf984d.mp4'
  };
  beforeEach(() => {
    process.env.fileUploaderS3BucketName = 'file-uploader-data-local';
    S3Service.mockImplementation(() => {
      return {
        upload: jest.fn().mockResolvedValue(expectedUploadData)
      }
    });
    handler = require('./index').handler;
    service = new S3Service();
  });

  it('should return a valid object key', async () => {
    expect.assertions(3);
    const mockCallback = jest.fn();
    await handler({
      body: {
        fileName: 'file-name.mp4',
        mimeType: 'video/mp4',
        file: 'FILE-BODY'
      }
    }, null, mockCallback);

    const expectedResponse = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(expectedUploadData)
    };
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(null);
    expect(mockCallback.mock.calls[0][1]).toEqual(expectedResponse);
  });
});
