import alt from '../alt';

class PurchaseActions {
  constructor() {
    this.generateActions(
      'purchaseSuccess',
      'purchaseFail',
    );
  }

  buyItem(item, price, payment_token, access_token) {
    $.ajax({ 
      url: '/buyItem',
      data: {
        item: item,
        price: price,
        payment_token: payment_token,
        access_token: access_token
      },
      type: 'POST'
    })
      .done((data) => {
        console.log(data);
        this.actions.purchaseSuccess(data);
      })
      .fail((err) => {
        this.actions.purchaseFail(err);
      });
  }
}

export default alt.createActions(PurchaseActions);
