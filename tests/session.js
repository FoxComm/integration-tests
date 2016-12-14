import faker from 'faker';
import createApi from './create-api';

export default function session (cb) {
  const api = createApi({ preserveCookies: true });
  const email = faker.internet.email();
  const name = faker.name.firstName();
  const password = faker.internet.password();

  return api.auth
    .signup(email, name, password)
    .then(({ user }) => {
      cb(null, user, api, { email, name, password });
    })
    .catch(err => cb(err));
}
