import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.user = "";
  }

  loginSuccess(data) {
    console.log(data);
    this.user = data.user;
  }

  loginFail(err) {
    console.log("failed to log in");
  }

}

export default alt.createStore(LoginStore);