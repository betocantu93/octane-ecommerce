import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
	@tracked lastRoute = null;
	@service notificationManager;
	@service cartManager;
	@service router;
	
	constructor() {
		super(...arguments)
		this.router.on('routeWillChange', ({ from }) => {
			this.lastRoute = from && from.name ? from.name : null;
		});
		this.cartManager.loadFromLocalStorage()
	}

	get inIndexRoute(){
		return this.router.currentRouteName === "index"
	}

	@action
	goBack(){
		!this.lastRoute ? this.transitionToRoute('index') : window.history.back();
	}

}
