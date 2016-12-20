import faker from 'faker';
import createApi from './create-api';

export default function session (cb) {
  const api = createApi({ preserveCookies: true });
  const email = faker.internet.email();
  const name = faker.name.firstName();
  const password = faker.internet.password();

  // console.log('Creating new user: %s/%s, %s', name, email, password);

  return api.auth
    .signup(email, name, password)
    .then((credentials) => {
      cb(null, credentials, api, { email, name, password });
      // console.log('User created');
    })
    .catch(err => {
      console.log('User creation error:', err);
      cb(err);
    });
}
