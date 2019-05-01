import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
	@service listing;

	async model(){
		if(typeof FastBoot === "undefined") {
			let module = await import('algoliasearch')
			this.listing.algolia = module.default('FEDPQMZMUP', 'd91401df3b347bbc2bb83a1c8142bab4')
		} else {
			this.listing.algolia = await FastBoot.require('algoliasearch/lite')('FEDPQMZMUP', 'd91401df3b347bbc2bb83a1c8142bab4');
		}
		await this.listing.getFacets();
	}
}
