import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Product, ProductInCart } from '../models';
import { action } from '@ember/object';


export default class CartManagerService extends Service {

	@tracked productsInCart = [];

	get total(){
		return this.productsInCart.reduce((total, productInCart) => {
			return total + ( productInCart.product.price * productInCart.quantity);
		}, 0)
	}

	constructor(){
		super(...arguments);
		this.productsInCart = [
			new ProductInCart({
				product: new Product({
					id: 1,
					price: 100,
					name: "Pink Floyd, Dark Side of The Moon",
					description: "Pink Floyd, Dark Side of The Moon",
					tags: [
						"rock",
						"progressive"
					]
				}),
				quantity: 5
			}),
			new ProductInCart({
				product: new Product({
					id: 2,
					price: 100,
					name: "Pink Floyd, Dark Side of The Moon",
					description: "Pink Floyd, Dark Side of The Moon",
					tags: [
						"rock",
						"progressive"
					]
				}),
				quantity: 1
			}),
			new ProductInCart({
				product: new Product({
					id: 3,
					price: 100,
					name: "Pink Floyd, Dark Side of The Moon",
					description: "Pink Floyd, Dark Side of The Moon",
					tags: [
						"rock",
						"progressive"
					]
				}),
				quantity: 3
				
			})
		]
	}

	@action
	add(product, quantity = 1) {
		let productInCart = new ProductInCart({product, quantity})
		this.productsInCart = this.productsInCart.addObject(productInCart);
	}

	@action
	delete(productInCart) {
		this.productsInCart = this.productsInCart.reject(currentProductInCart => currentProductInCart.product.id === productInCart.product.id)
	}

	@action
	incrementQuantity(productInCart) {
		productInCart.quantity++;
	}


}
