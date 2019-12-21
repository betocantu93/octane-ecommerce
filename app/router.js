import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('detail', { path: 'detail/:product_id'});
  this.route('cart');
  this.route('make-products');
});
