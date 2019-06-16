
jest.mock('./s3.service');
const S3Service = require('./s3.service');

describe('Retrieve Signed URL Handler Test Suite', () => {
  let handler;
  const expectedUrl = 'https://file-transcoded-data'
  beforeEach(() => {
    S3Service.mockImplementation(() => {
      return {
        getSignedUrl: jest.fn().mockImplementation(() => expectedUrl)
      };
    });
    handler = require('./retrieveSignedUrl').handler;
    service = new S3Service();
  });

  it('should make a valid signed url', (done) => {
    expect.assertions(3);
    const mockCallback = jest.fn();
    handler({
      body: JSON.stringify({
        key: 'key-name',
        bucket: 'bucket-name'
      })
    }, null, mockCallback);

    const expectedResponse = {
      body: JSON.stringify({ url: expectedUrl }),
      headers: {
        "Access-Control-Allow-Credentials": true, 
        "Access-Control-Allow-Origin": "*"
      }, 
      statusCode: 200
    };
    expect(mockCallback.mock.calls.length).toBe(1);
    expect(mockCallback.mock.calls[0][0]).toBe(null);
    expect(mockCallback.mock.calls[0][1]).toEqual(expectedResponse);
    done();
  });
});
