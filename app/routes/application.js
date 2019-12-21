import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service listing;

  async model() {
    if (typeof FastBoot !== 'undefined') {
      this.listing.algolia = await FastBoot.require('algoliasearch')(
        'FEDPQMZMUP',
        'd91401df3b347bbc2bb83a1c8142bab4'
      );
    } else {
      /**
       * In order to prevent algoliasearch from crashing, we must define process on window.
       * https://stackoverflow.com/questions/50313745/angular-6-process-is-not-defined-when-trying-to-serve-application
       */
      window.process = {
        env: { DEBUG: undefined }
      };
      let module = await import('algoliasearch/lite');
      this.listing.algolia = module.default(
        'FEDPQMZMUP',
        'd91401df3b347bbc2bb83a1c8142bab4'
      );
    }
    return await this.listing.getFacets();
  }
}
