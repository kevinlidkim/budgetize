import alt from '../alt';

class ProfileActions {
  constructor() {
    this.generateActions(
      'saveCardSuccess',
      'saveCardFail'
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

}

export default alt.createActions(ProfileActions);