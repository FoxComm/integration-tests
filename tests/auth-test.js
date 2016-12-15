import test from 'tape';
import faker from 'faker';
import createApi from './create-api';

const api = createApi();

test('User should be created successfully', t => {
  const email = faker.internet.email();
  const name = faker.name.firstName();
  const password = faker.internet.password();

  api.auth.signup(email, name, password).then(({ user }) => {
    t.equal(user.email, email.toLowerCase(), 'User has email');
    t.equal(user.name, name, 'User has name');
    t.notOk(user.isGuest, 'User is not guest');
    t.end();
  }).catch(err => console.log('error:', err));
});
