import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DetailController extends Controller {
	@tracked quantity = 1;

	@service cartManager;
	
}
