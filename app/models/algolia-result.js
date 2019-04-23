import { tracked } from '@glimmer/tracking';

export default class Facet {
  @tracked hits = [];
  @tracked total = 0;
  @tracked totalPages = 0;

  constructor({
    hits = [],
    total = 0,
    totalPages = 0
  }) {
    this.hits = hits;
    this.total = total;
    this.totalPages = totalPages;
  }

}
