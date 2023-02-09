import HttpTransport from './HTTPTransport';

describe('api/HttpTransport', () => {
  const testRequest = new HttpTransport();
  it('Checking error auth', async () => {
    try {
      await testRequest.post('auth/signin', {
        data: { login: '', password: '' },
      });
    } catch (err) {
      const reason = JSON.parse(err).reason;
      expect(reason).toEqual('Error signin');
    }
  });

});
