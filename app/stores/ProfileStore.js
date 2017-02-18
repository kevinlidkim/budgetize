import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.creditcard = "";
    this.budget = "";
    this.payment_token = "";
  }

  saveCardSuccess(data) {
    // console.log(data);
    this.payment_token = data.payment_token;
    this.budget = data.budget;
    // console.log('saved card');
  }

  saveCardFail(err) {
    console.log("failed to save card");
  }

}

export default alt.createStore(ProfileStore);