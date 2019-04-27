import { tracked } from '@glimmer/tracking';

export default class FacetModel {
  @tracked key = "";
  @tracked name = "";
  @tracked count = 0;

  constructor({
    key = "",
    name = "",
    count = 0
  }) {
    this.key = key;
    this.name = name;
    this.count = count;
  }

  get queryParam(){
    return `${this.key}:${this.name}`
  }
}
