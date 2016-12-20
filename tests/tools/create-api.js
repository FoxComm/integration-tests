import Api from '@foxcomm/api-js';
import supertest from 'supertest';
import superagent from 'superagent';

export default function createApi(options = {}) {
  const apiBaseUrl = process.env.API_URL;

  if (!apiBaseUrl) {
    throw new Error('API_URL is not defined in process.env');
  }

  let agent = superagent; // supertest();

  if (options.preserveCookies) {
    agent = superagent.agent(); // supertest.agent(apiBaseUrl);
  }

  return new Api({
    api_url: apiBaseUrl + '/api',
    stripe_key: 'pk_test_JvTXpI3DrkV6QwdcmZarmlfk',
    agent,
    handleResponse: options.handleResponse,
  });
}
