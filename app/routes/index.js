import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
	@service cartManager;

	afterModel(){
		super.afterModel(...arguments);
		console.log(this.cartManager);
	}
}
