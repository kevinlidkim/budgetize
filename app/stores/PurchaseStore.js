import alt from '../alt';
import PurchaseActions from '../actions/PurchaseActions';
import ProfileStore from './ProfileStore'

class PurchaseStore {
  constructor() {
    this.bindActions(PurchaseActions);
    this.user = "";
    this.access_token = "";
    this.payment = "";
  }

  purchaseSuccess(data) {
    ProfileStore.state.budget = "100";
    console.log(ProfileStore.state.budget);
    console.log(ProfileStore.state);
  }

  purchaseFail(err) {
    console.log("failed to purchase");
  }

}

export default alt.createStore(PurchaseStore);