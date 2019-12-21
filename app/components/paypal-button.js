import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { scheduleOnce } from '@ember/runloop';

export default class PaypalButtonComponent extends Component {
  @service cartManager;
  @tracked email = '';
  @tracked name = '';
  @tracked products = '';
  @tracked total = '';

  @action
  didInsertPaypal(ele) {
    this.renderPaypal(ele);
  }

  renderPaypal(ele) {
    paypal.Buttons.call(this, {
      createOrder: (data, actions) => {
        return actions.order.create(this.cartManager.toPayPal);
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          this.name = details.payer.name.given_name;
          this.email = details.payer.email_address;
          this.total = details.purchase_units[0].amount.value;
          this.products = `
						<ul>
							${details.purchase_units[0].items
                .map(({ sku, name, quantity, unit_amount }) => {
                  return `<li>Product ${sku} - ${name} X ${quantity} = $${quantity *
                    unit_amount.value} </li>`;
                })
                .join(', ')}
						</ul>
					`;
          scheduleOnce('afterRender', this, this.clearFormAndCart);
        });
      }
    }).render(ele);
  }

  clearFormAndCart() {
    document.formspree.submit();
    this.cartManager.clear();
  }
}
