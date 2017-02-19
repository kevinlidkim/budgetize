import alt from '../alt';

class ProfileActions {
  constructor() {
    this.generateActions(
      'saveCardSuccess',
      'saveCardFail',
      'purchaseSuccess',
      'purchaseFail',
      'getTransactionsSuccess',
      'getTransactionsFail'
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
        alert("Added credit card")
        this.actions.saveCardSuccess(data);
      })
      .fail((err) => {
        this.actions.saveCardFail(err);
      });
  }

  buyItem(item, price, payment_token, access_token, user) {
    $.ajax({ 
      url: '/buyItem',
      data: {
        item: item,
        price: price,
        payment_token: payment_token,
        access_token: access_token,
        user: user
      },
      type: 'POST'
    })
      .done((data) => {
        // console.log(data);
        alert("Purchased item");
        this.actions.purchaseSuccess(data);
      })
      .fail((err) => {
        this.actions.purchaseFail(err);
      });
  }

  getTransactions(user, access_token) {
    $.ajax({ 
      url: '/getTransactions',
      data: {
        access_token: access_token,
        user: user
      },
      type: 'POST'
    })
      .done((data) => {
        // console.log(data);
        this.actions.getTransactionsSuccess(data);
      })
      .fail((err) => {
        this.actions.getTransactionsFail(err);
      });
  }

}

export default alt.createActions(ProfileActions);