import Api from '@foxcomm/api-js';
import supertest from 'supertest';

export default function createApi(options = {}) {
  const apiBaseUrl = process.env.API_URL;
  let agent = supertest(apiBaseUrl);

  if (options.preserveCookies) {
    agent = supertest.agent(apiBaseUrl);
  }

  return new Api({
    api_url: '/api',
    stripe_key: 'pk_test_JvTXpI3DrkV6QwdcmZarmlfk',
    agent,
  });
}
