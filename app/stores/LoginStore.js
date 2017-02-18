import alt from '../alt';
import LoginActions from '../actions/LoginActions';

class LoginStore {
  constructor() {
    this.bindActions(LoginActions);
    this.user = "";
    this.access_token = "";
  }

  loginSuccess(data) {
    // console.log(data);
    this.user = data.user;
    this.access_token = data.access_token;
  }

  loginFail(err) {
    console.log("failed to log in");
  }

  getToken() {
    return access_token;
  }

}

export default alt.createStore(LoginStore);