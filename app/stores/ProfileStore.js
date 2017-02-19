import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.creditcard = "";
    this.budget = "";
    this.access_token = "";
    this.payment_token = "";
    this.purchases = [];
  }

  saveCardSuccess(data) {
    // console.log(data);
    this.payment_token = data.payment_token;
    this.budget = data.budget;
    // console.log('saved card');
  }

  saveCardFail(err) {
    alert("Invalid credit card credentials")
    console.log("failed to save card");
  }

  purchaseSuccess(data) {
    // console.log(data.data);
    this.budget = this.budget - data.data.paymentAmount;
  }

  purchaseFail(err) {
    // console.log("failed to purchase");
    alert("failed to purchase");
  }

  getTransactionsSuccess(data) {
    console.log(data);
    this.purchases = [];
    for (var i = 0; i < data.data.length; i++) {
      // console.log(data.data[i]['Name']);
      this.purchases.push(data.data[i]['Name']);
    }
  }

  getTransactionsFail(err) {
    console.log(err);
  }

}

export default alt.createStore(ProfileStore);
