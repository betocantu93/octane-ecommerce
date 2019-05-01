import ENV from '../config/environment';

export function initialize(appInstance) {

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
