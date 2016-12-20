export function addToCart(api, payload) {
  return api.post('/v1/my/cart/line-items', payload);
}
