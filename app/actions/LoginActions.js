import alt from '../alt';

class LoginActions {
  constructor() {
    this.generateActions(
      'loginSuccess',
      'loginFail',
      'getToken',
    );
  }

  loginUser(username, password) {
    $.ajax({ 
      url: '/loginUser',
      data: {
        username: username,
        password: password
      },
      type: 'POST'
    })
      .done((data) => {
        this.actions.loginSuccess(data);
        // retrieve Softheon API access token here
      })
      .fail((err) => {
        this.actions.loginFail(err);
      });
  }
}

export default alt.createActions(LoginActions);