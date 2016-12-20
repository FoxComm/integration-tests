import test from 'tape-async';
import createApi from './tools/create-api';
import searchItems from './tools/search-items';

const api = createApi();

test('Retrived item list size should be the same as requested', async t => {
  const items = await searchItems(api, 5);

  t.equal(items.total, 5, 'Total size of searched items is equal to requsted size');
});
