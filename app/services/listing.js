import Service from '@ember/service';
import {
  tracked
} from '@glimmer/tracking';
import {
  Product,
	Facet,
	AlgoliaResult
} from '../models';
import {
  action
} from '@ember/object';


export default class ListingService extends Service {
  @tracked currentIndex = this.ALGOLIA_INDEXES[0];
  @tracked lastResult = new AlgoliaResult({});
	@tracked facets = [];

  ALGOLIA_INDEXES = [
    "products"
  ];

  @action
  changeIndex(index) {
    this.currentIndex = this.ALGOLIA_INDEXES.find(ele => ele === index) || ALGOLIA_INDEXES[0];
  }

  constructor() {
    super(...arguments);
    window.algolia.initIndex(this.currentIndex).search(
      {
        facets: ['*']
      },
      function (error, content, state) {
        let facets = [];
        Object.keys(content.facets).forEach(facetKey => {
          let facet = content.facets[facetKey];
          Object.keys(facet).forEach(key => {
            facets.addObject(new Facet({key: facetKey, name: key, count: facet[key]}))
          })	
        })
        this.facets = facets;
      }.bind(this)
    );
  }

  @action
  async search({ query, facets: facetsFilters, page, pageSize }) {
    let algoliaFilters = {
      query,
      facets: ['*'],
      page: page - 1,
      hitsPerPage: pageSize,
			filters: facetsFilters.map(facet => {
        let [ type, name ] = facet.split(':');
        return `${type}:"${name}"`
      }).join(' AND ')
    };

    let results = await new Promise(resolve => {
      window.algolia.initIndex(this.currentIndex).search(
        algoliaFilters,
        function (error, content, state) {
          this.lastResult.total = content.nbHits;
          this.lastResult.totalPages = content.nbPages;
          let results = content.hits.map(hit => new Product(hit));
					this.lastResult.hits = results;
					
          resolve(results);
        }.bind(this)
      );
    })
    return results;
	}
	
}
