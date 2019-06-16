const { parseForm } = require('./multipart.service');

describe('Multipart Service Test Suite', () => {
  let event = {};

  beforeEach(() => {
    event = {
      headers : {}
    };
  });
  
  describe('event without body', () => {
    beforeEach(() => {
      event.body = undefined;
    });

    it('should return the original event', async () => {
      const data = await parseForm(event);
      expect(data).toBe(event);
    });
  });

  describe('application/json body request', () => {
    beforeEach(() => {
      event.isBase64Encoded = false;
      event.headers['content-type'] = 'application/json';
      event.body = { status: 'ok' };
    });

    it('should return the original event', async () => {
      const data = await parseForm(event);
      expect(data).toBe(event);
    });
  });

  describe('multipart/form-data binary body request', () => {
    let data;
    beforeEach(async () => {
      event.isBase64Encoded = false;
      event.headers['Content-Type'] = 'multipart/form-data; boundary=----550737016686139035800685';
      event.body =  [
        '------550737016686139035800685',
        'Content-Disposition: form-data; name="file"; filename="testfile.txt"',
        'Content-Type: text/plain',
        '',
        'test',
        '------550737016686139035800685--'
     ].join('\r\n');
     data = await parseForm(event);
    });
    
    it('should return parsed body', () => {
      expect(data.body.mimeType).toBe('text/plain');
      expect(data.body.fileName).toBe('testfile.txt');
      expect(data.body.file.toString()).toBe('test');
    });
  });

  describe('multipart/form-data binary + field body request', () => {
    let data;
    beforeEach(async () => {
      event.isBase64Encoded = false;
      event.headers['Content-Type'] = 'multipart/form-data; boundary=----550737016686139035800685';
      event.body =  [
        '------550737016686139035800685',
        'Content-Disposition: form-data; name="file"; filename="testfile.txt"',
        'Content-Type: text/plain',
        '',
        'test',
        '------550737016686139035800685',
        'Content-Disposition: form-data; name="email"',
        '',
        'test@fakeemail.com',
        '------550737016686139035800685--'
     ].join('\r\n');
     data = await parseForm(event);
    });
    
    it('should return parsed body', () => {
      expect(data.body.mimeType).toBe('text/plain');
      expect(data.body.fileName).toBe('testfile.txt');
      expect(data.body.file.toString()).toBe('test');
    });

    it('should return parsed email field', () => {
      expect(data.body.email).toBe('test@fakeemail.com');
    });
  });

  describe('base64 body request', () => {
    let data;
    beforeEach(async () => {
      event.isBase64Encoded = true;
      event.headers['Content-Type'] = 'multipart/form-data; boundary=--------------------------103234887785263193438927';
      // tslint:disable-next-line:max-line-length
      event.body = 'LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTEwMzIzNDg4Nzc4NTI2MzE5MzQzODkyNw0KQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPSJmaWxlIjsgZmlsZW5hbWU9InRlc3RmaWxlLnR4dCINCkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbg0KDQp0ZXN0DQotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tMTAzMjM0ODg3Nzg1MjYzMTkzNDM4OTI3LS0NCg==';
      data = await parseForm(event);
    });
    
    it('should return parsed body', () => {
      expect(data.body.mimeType).toBe('text/plain');
      expect(data.body.fileName).toBe('testfile.txt');
      expect(data.body.file.toString()).toBe('test');
    });
  });

  describe('invalid multipart/form-data format', () => {
    beforeEach(() => {
      event.isBase64Encoded = false;
      event.headers['Content-Type'] = 'multipart/form-data; boundary=----550737016686139035800685';
      event.body =  [
        '------550737016686139035800685',
        'Content-Disposition: form-data; name="file"; filename="testfile.txt"',
        'Content-Type: text/plain',
        '',
        'test',
        '------550737016686139035800685'
     ].join('\r\n');
    });
    
    it('should throw an error', async () => {
      expect.assertions(1);
      try {
        await parseForm(event);
      } catch (error) {
        expect(error).toEqual(new Error('Parse error: Unexpected end of multipart data'));
      }
    });

  });
});
