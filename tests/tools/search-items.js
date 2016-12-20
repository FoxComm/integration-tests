export default function searchItems(api, size) {
  return api.get(`/search/public/products_catalog_view/_search?size=${size}`);
}
