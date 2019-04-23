import {
  tracked
} from '@glimmer/tracking';


export default class ProductModel {
  @tracked price = 0;
  @tracked brand = "";
  @tracked name = "";
  @tracked description = "";
  @tracked tags = [];
  @tracked artwork = [];
  @tracked releaseYear = "";
  @tracked objectId = "";

  constructor({
    price = 0,
    brand = "",
    name = "",
    description = "",
    releaseYear = "",
    _tags = [],
    artwork = ["https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Dark_Side_of_the_Moon.png/220px-Dark_Side_of_the_Moon.png"],
    objectID = ""
  }) {
    this.objectID = objectID;
    this.price = price;
    this.brand = brand;
    this.name = name;
    this.description = description;
    this.releaseYear = releaseYear;
    this.tags = _tags;
    this.artwork = artwork;
  }

}