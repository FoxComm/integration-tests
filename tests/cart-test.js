import _ from 'lodash';
import test from 'tape-async';
import session from './tools/session';
import searchItems from './tools/search-items';
import { addToCart } from './tools/cart-actions';
import createApi from './tools/create-api';

session((err, { user, jwt }, api, credentials) => {
  test('Cart items should be preserved after logout and login with the same credentials', async t => {
    const items = await searchItems(api, 2);
    const payload = items.result.map(({ skus }) => ({ sku: skus[0], quantity: 1 }));
    const cart = await addToCart(api, payload);
    const cartSkusBeforeLogout = _.sortBy(cart.result.lineItems.skus, 'sku');

    t.equal(cartSkusBeforeLogout.length, 2, 'Items should be added to the cart');

    await api.auth.logout();
    const guestUser = await api.account.get();
    t.ok(guestUser.isGuest, 'User should be guest after logout');

    const api2 = createApi();

    await api2.auth.login(credentials.email, credentials.password, 'merchant');

    const cart2 = await api2.cart.get();
    const cartSkusAfterSecondLogin = _.sortBy(cart2.lineItems.skus, 'sku');

    t.deepEqual(cartSkusBeforeLogout, cartSkusAfterSecondLogin, 'Cart items should be preserved after second login');
  });
});
