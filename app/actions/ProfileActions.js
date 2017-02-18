import alt from '../alt';

class ProfileActions {
  constructor() {
    this.generateActions(
      'saveCardSuccess',
      'saveCardFail',
      'purchaseSuccess',
      'purchaseFail'
    );
  }

  saveCard(creditcard, cvn, month, year, owner, address, email, access_token, budget) {
    $.ajax({ 
      url: '/saveCard',
      data: {
        creditcard: creditcard,
        cvn: cvn,
        month: month,
        year: year,
        owner: owner,
        billingAddress: address,
        email: email,
        access_token: access_token,
        budget: budget
      },
      type: 'POST'
    })
      .done((data) => {
        this.actions.saveCardSuccess(data);
      })
      .fail((err) => {
        this.actions.saveCardFail(err);
      });
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
        // console.log(data);
        this.actions.purchaseSuccess(data);
      })
      .fail((err) => {
        this.actions.purchaseFail(err);
      });
  }

}

export default alt.createActions(ProfileActions);