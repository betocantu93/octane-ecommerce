import Route from '@ember/routing/route';
import {
  Product
} from '../models';
import {
  inject as service
} from '@ember/service';
export default class DetailRoute extends Route {
  @service listing;
  @service headData;

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

  async afterModel(product) {
    this.headData.set('ogDescription', `${product.brand}: ${product.name}`)
    this.headData.set('ogTitle', `${product.brand}: ${product.name}`)
    this.headData.set('ogArtwork', `${product.artwork[0]}`)
  }
}
