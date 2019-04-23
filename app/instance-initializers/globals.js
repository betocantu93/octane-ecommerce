import ENV from '../config/environment';
import algoliasearch from 'algoliasearch';

export function initialize(appInstance) {

  window.algolia = algoliasearch('FEDPQMZMUP', 'd91401df3b347bbc2bb83a1c8142bab4');

  if (ENV.environment === 'development') {
    let cartManager = appInstance.lookup('service:cart-manager');
    let listing = appInstance.lookup('service:listing');

    if (window) {
      window.app = {
        cartManager,
        listing
      };
    }
  }
}

export default {
  initialize
};
