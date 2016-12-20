import test from 'tape-async';
import session from './tools/session';

session((err, user, api, credentials) => {
  test('Authorized session should be preserved during multiple requests', async t => {
    t.error(err, 'Session: user should be created successfully');

    const userFromAccount = await api.account.get();
    t.notOk(userFromAccount.isGuest, 'User should not be guest');
    t.equal(userFromAccount.email, credentials.email.toLowerCase(), 'User has email');
    t.equal(userFromAccount.name, credentials.name, 'User has name');

    await api.auth.logout();
    const guestUser = await api.account.get();
    t.ok(guestUser.isGuest, 'User should be guest after logout');
    t.notEqual(guestUser.email, credentials.email.toLowerCase(), 'Guest user should not have email');
    t.notEqual(guestUser.name, credentials.name, 'Guest user should not have name');
  });
});
