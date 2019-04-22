import Product from './product';
import { tracked } from '@glimmer/tracking';


export default class ProductInCartModel { 
	@tracked product = new Product({});
	@tracked quantity = 0;

	constructor({ product, quantity = 0 }) {
		this.product = product;
		this.quantity = quantity;
	}
}