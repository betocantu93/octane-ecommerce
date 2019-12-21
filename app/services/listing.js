import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Product, Facet, AlgoliaResult } from '../models';
import { action } from '@ember/object';

export default class ListingService extends Service {
  @tracked currentIndex = this.ALGOLIA_INDEXES[0];
  @tracked lastResult = new AlgoliaResult({});
  @tracked facets = [];
  @tracked algolia = null;

  ALGOLIA_INDEXES = ['products'];

  @action
  changeIndex(index) {
    this.currentIndex =
      this.ALGOLIA_INDEXES.find(ele => ele === index) || ALGOLIA_INDEXES[0];
  }

  @action
  async getFacets() {
    await new Promise(resolve => {
      this.algolia.initIndex(this.currentIndex).search(
        {
          facets: ['*']
        },
        function(error, content) {
          let facets = [];
          Object.keys(content.facets).forEach(facetKey => {
            let facet = content.facets[facetKey];
            Object.keys(facet).forEach(key => {
              facets.addObject(
                new Facet({
                  key: facetKey,
                  name: key,
                  count: facet[key]
                })
              );
            });
          });
          this.facets = facets;
          resolve(facets);
        }.bind(this)
      );
    });
  }

  @action
  async search({ query, facets: facetsFilters, page, pageSize }) {
    let parsedFilters = Array.isArray(facetsFilters)
      ? facetsFilters
      : JSON.parse(facetsFilters);

    let brandFilters = parsedFilters
      .filter(facet => facet.split(':')[0] === 'brand')
      .map(facet => {
        let [type, name] = facet.split(':');
        return `${type}:'${name}'`;
      })
      .join(' OR ');

    let tagFilters = parsedFilters
      .filter(facet => facet.split(':')[0] === '_tags')
      .map(facet => {
        let [type, name] = facet.split(':');
        return `${type}:'${name}'`;
      })
      .join(' OR ');

    brandFilters = brandFilters.length ? `(${brandFilters})` : brandFilters;
    tagFilters = tagFilters.length ? `(${tagFilters})` : tagFilters;
    let filters = '';

    if (brandFilters.length && tagFilters.length) {
      filters = `${brandFilters} AND ${tagFilters}`;
    } else if (brandFilters.length) {
      filters = brandFilters;
    } else {
      filters = tagFilters;
    }

    let algoliaFilters = {
      query,
      facets: ['*'],
      page: page - 1,
      hitsPerPage: pageSize,
      filters
    };

    let results = await new Promise(resolve => {
      this.algolia.initIndex(this.currentIndex).search(
        algoliaFilters,
        function(error, content) {
          this.lastResult.total = content.nbHits;
          this.lastResult.totalPages = content.nbPages;
          let results = content.hits.map(hit => new Product(hit));
          this.lastResult.hits = results;

          resolve(results);
        }.bind(this)
      );
    });
    return results;
  }
}
