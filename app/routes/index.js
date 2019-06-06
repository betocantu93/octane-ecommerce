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

  deserializeQueryParam(value, urlKey, defaultValueType) {
    if (defaultValueType === 'array') {
      if (value && !Array.isArray(value)) {
        return value.split(',');
      }
      return value;

      // Original: return Ember.A(JSON.parse(value));
    }

    if (defaultValueType === 'boolean') {
      return value;
    } else if (defaultValueType === 'number') {
      return Number(value).valueOf();
    }
    return value;
  }

  serializeQueryParam(value, urlKey, defaultValueType) {
    if (value === null || value === undefined) {
      return null;
    } else if (defaultValueType === 'array') {
      if (Array.isArray(value)) {
        return value.join(',');
      }

      return value;

      //  return JSON.stringify(value);
    }

    return '' + value;
  }
  
}
