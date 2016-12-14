import test from 'blue-tape';
import session from './session';

session((err, user, api, credentials) => {
  test('Authorized session should be preserved during multiple requests', t => {
    t.error(err, 'Session: user should be created successfully');

    api.account.get().then(userFromAccount => {
      t.notOk(userFromAccount.isGuest, 'User should not be guest');
      t.equal(userFromAccount.email, credentials.email.toLowerCase(), 'User has email');
      t.equal(userFromAccount.name, credentials.name, 'User has name');
    });

    api.auth.logout().then(() => {
      api.account.get().then(guestUser => {
        t.ok(guestUser.isGuest, 'User should be guest after logout');
        t.notEqual(guestUser.email, credentials.email.toLowerCase(), 'Guest user should not have email');
        t.notEqual(guestUser.name, credentials.name, 'Guest user should not have name');
        t.end();
      });
    });
  });
});
