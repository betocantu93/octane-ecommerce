import Service from '@ember/service';
import {
  tracked
} from '@glimmer/tracking';
import {
  Product,
  ProductInCart
} from '../models';
import {
  action
} from '@ember/object';

export default class CartManagerService extends Service {

  @tracked productsInCart = [];

  get total() {
    return this.productsInCart.reduce((total, productInCart) => {
      return total + (productInCart.product.price * productInCart.quantity);
    }, 0)
  }

  @action
  add(product, quantity = 1) {
    let productInCart = new ProductInCart({
      product,
      quantity
    })
    let found = this.productsInCart.find(pic => pic.product.objectID === product.objectID);
    !found && (this.productsInCart = this.productsInCart.addObject(productInCart));
  }

  @action
  delete(productInCart) {
    this.productsInCart = this.productsInCart.reject(currentProductInCart => currentProductInCart.product.objectID === productInCart.product.objectID)
  }

  @action
  decrementQuantity(productInCart) {
    productInCart.quantity--;
  }
  @action
  incrementQuantity(productInCart) {
    productInCart.quantity++;
  }

}
