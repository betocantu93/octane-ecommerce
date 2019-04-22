import { tracked } from '@glimmer/tracking';


export default class ProductModel {
	@tracked price = 0;
	@tracked name = "";
	@tracked description = "";
	@tracked tags = [];
	@tracked id = 0;

	constructor({
		price, name, description, tags, id
	}){
		this.id = id;
		this.price = price;
		this.name = name;
		this.description = description;
		this.tags = tags;
	}
}