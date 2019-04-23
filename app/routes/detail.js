import Route from '@ember/routing/route';
import {
  Product
} from '../models';

export default class DetailRoute extends Route {

  async model({
    product_id
  }) {
    return new Promise(resolve => {
      window.algolia.initIndex("products").search({
          facetFilters: [`objectID:${product_id}`]
        },
        function (error, content, state) {
          resolve(new Product(content.hits.firstObject));
        }
      )
    })
  }
}
