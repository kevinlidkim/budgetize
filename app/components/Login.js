import React from 'react';
import linkState from 'react-link-state';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
    // console.log(state);
    // console.log(LoginStore.state);
  }

  login(event) {
    event.preventDefault();
    LoginActions.loginUser(this.state.username, this.state.password);
  }


  render() {
    return (
      <div>
        <div className='col-md-4'>
        </div>
        <div className='col-md-4'>
          <div className="form-container">
            <form className="form">
              <div className="form-group">
                <label for="username">Username</label>
                <input type="text" valueLink={linkState(this, 'username')}placeholder="Username" id="username" className="form-control" />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input type="password" valueLink={linkState(this, 'password')} placeholder="Password" id="password" className="form-control" />
              </div>
              <button type="submit" className="btn btn-default" onClick={this.login.bind(this)}>Login</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;