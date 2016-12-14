import Api from '../../api-js/src';
import supertest from 'supertest';
import superagent from 'superagent';

export default function createApi(options) {
  const apiBaseUrl = 'https://test-perfectgourmet.foxcommerce.com';
  let apiUrl = `${apiBaseUrl}/api`;
  let agent = superagent;

  if (options.preserveCookies) {
    agent = supertest.agent(apiBaseUrl);
    apiUrl = '/api';
  }

  return new Api({
    api_url: apiUrl,
    stripe_key: 'pk_test_JvTXpI3DrkV6QwdcmZarmlfk',
    agent,
  });
}
