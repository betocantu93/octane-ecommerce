import Route from '@ember/routing/route';
import {
  inject as service
} from '@ember/service';

export default class IndexRoute extends Route {
  @service listing;

  queryParams = {
    query: {
      refreshModel: true
    },
    facets: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    pageSize: {
      refreshModel: true
    }
  }

  async model({ query, facets, page, pageSize }) {
    return await this.listing.search({ query, facets, page, pageSize })
  }
}
