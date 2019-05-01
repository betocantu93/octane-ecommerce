import Route from '@ember/routing/route';
import {
  Product
} from '../models';
import {
  inject as service
} from '@ember/service';
export default class DetailRoute extends Route {
  @service listing;

  async model({
    product_id
  }) {
    return new Promise(resolve => {
      this.listing.algolia.initIndex("products").search({
          facetFilters: [`objectID:${product_id}`]
        },
        function (error, content) {
          resolve(new Product(content.hits.pop()));
        }
      )
    })

  }

  setupController(controller) {
    super.setupController(...arguments);
    controller.quantity = 1;
  }
}
