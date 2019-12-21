import Controller from '@ember/controller';
import {
  inject as service
} from '@ember/service';
import {
  action
} from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @service cartManager;
  @service listing;
  @tracked showMore = false;
  facetQuantityToShow = 12;

  queryParams = ['query', 'facets', 'page', 'pageSize'];
  query = "";
  facets = [];
  page = 1;
  pageSize = 20;

  @action
  changeQuery(e) {
    this.set('query', e.target.value);
    this.set('page', 1);
  }

  @action
  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  @action
  toggleFacet(facet) {
    let found = this.facets.find(f => f === facet.queryParam);
    if (found) {
      this.facets.removeObject(facet.queryParam);
    } else {
      this.facets.addObject(facet.queryParam)
    }

    this.set('page', 1);

  }

  @action
  reset() {
    this.setProperties({
      query: '',
      facets: [],
      page: 1,
      pageSize: 20
    })
  }

  @action
  back(){
    this.set('page', this.page - 1);
  }

  @action
  forward(){
    this.set('page', this.page + 1);
  }
}
