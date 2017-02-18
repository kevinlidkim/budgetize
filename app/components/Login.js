import React from 'react';
import linkState from 'react-link-state';
import LoginStore from '../stores/LoginStore'
import LoginActions from '../actions/LoginActions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  login(event) {
    event.preventDefault();
    LoginActions.loginUser(this.state.username, this.state.password);
  }


  render() {
    return (
      <div className="form-container">
        <form className="form">
          <div className="form-group">
            <input type="text" valueLink={linkState(this, 'user')}placeholder="Username" />
            <input type="password" valueLink={linkState(this, 'password')} placeholder="Password" />
          </div>
          <button type="submit" onClick={this.login.bind(this)}>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;