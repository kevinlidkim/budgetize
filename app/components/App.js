import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoginStore from '../stores/LoginStore'
import ProfileStore from '../stores/ProfileStore'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      access_token: '',
      payment_token: '',
      budget: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    LoginStore.listen(this.onChange);
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.onChange);
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({access_token: LoginStore.state.access_token});
    this.setState({payment_token: ProfileStore.state.payment_token});
    this.setState({budget: ProfileStore.state.budget});
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Navbar history={this.props.history} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;