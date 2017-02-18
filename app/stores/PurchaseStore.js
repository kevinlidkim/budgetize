import alt from '../alt';
import PurchaseActions from '../actions/PurchaseActions';

class PurchaseStore {
  constructor() {
    this.bindActions(PurchaseActions);
    this.user = "";
    this.access_token = "";
  }

  purchaseSuccess(data) {
    console.log(data);
  }

  purchaseFail(err) {
    console.log("failed to purchase");
  }

  getToken() {
    return access_token;
  }

}

export default alt.createStore(PurchaseStore);