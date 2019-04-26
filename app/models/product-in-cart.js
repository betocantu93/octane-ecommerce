import Product from './product';
import {
  tracked
} from '@glimmer/tracking';


export default class ProductInCartModel {
  @tracked product = new Product({});
  @tracked quantity = 0;

  constructor({
    product,
    quantity = 0
  }) {
    this.product = product;
    this.quantity = quantity;
  }

  get toPlainObject() {
    let model = {};
    Object.keys(this.constructor.prototype).forEach(key => {
      model[key] = Array.isArray(this[key]) || typeof this[key] !== "object" ? this[key] : this[key].toPlainObject
    });
    return model;
  }
}
