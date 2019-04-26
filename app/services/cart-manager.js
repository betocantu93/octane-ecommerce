import Service, {
  inject as service
} from '@ember/service';
import {
  tracked
} from '@glimmer/tracking';
import {
  ProductInCart,
  Product
} from '../models';
import {
  action
} from '@ember/object';

export default class CartManagerService extends Service {

  @tracked productsInCart = [];
  @service notificationManager;

  get total() {
    return Math.round(this.productsInCart.reduce((total, productInCart) => {
      return total + (productInCart.product.price * productInCart.quantity);
    }, 0) * 100) / 100
  }

  @action
  add(product, quantity = 1) {
    let productInCart = new ProductInCart({
      product,
      quantity
    })
    let found = this.productsInCart.find(pic => pic.product.objectID === product.objectID);
    !found && (this.productsInCart = this.productsInCart.addObject(productInCart)) && this.notificationManager.notify(`${product.name} x ${quantity} added to cart!`, 3000);
    this.persistToLocalStorage();
  }

  @action
  delete(productInCart) {
    this.productsInCart = this.productsInCart.reject(currentProductInCart => currentProductInCart.product.objectID === productInCart.product.objectID)
  }

  @action
  decrementQuantity(productInCart) {
    productInCart.quantity--;
    this.persistToLocalStorage();
  }
  @action
  incrementQuantity(productInCart) {
    productInCart.quantity++;
    this.persistToLocalStorage();
  }

  persistToLocalStorage() {
    let cartToPersist = this.productsInCart.map(productInCart => productInCart.toPlainObject);
    window.localStorage.setItem('cart', JSON.stringify(cartToPersist));
  }

  loadFromLocalStorage() {
    let cartFromLocal = window.localStorage.getItem('cart');
    cartFromLocal = cartFromLocal ? JSON.parse(cartFromLocal) : []
    cartFromLocal.forEach(({
      product,
      quantity
    }) => {
      this.productsInCart.addObject(
        new ProductInCart({
          product: new Product(product),
          quantity
        })
      );
    })
  }

  get toPayPal() {
    return {
      purchase_units: [{
        amount: {
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: this.total
            }
          },
          value: this.total
        },
        items: this.productsInCart.map(({
          product,
          quantity
        }) => ({
          name: product.name,
          sku: product.objectID,
          unit_amount: {
            currency_code: "USD",
            value: `${Math.round(product.price * 100) / 100}`
          },
          quantity
        }))
      }]
    }
  }

}
