import React from 'react';
import linkState from 'react-link-state';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import LoginStore from '../stores/LoginStore';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      creditcard: '',
      cvn: '',
      month: '',
      year: '',
      owner: '',
      address: '',
      email: '',
      access_token: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      budget: '',
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    LoginStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
    // this.setState({budget: ProfileStore.budget - PurchaseStore.payment});
    // this.setState({access_token: LoginStore.state.access_token});
  }

  saveCard(event) {
    event.preventDefault();
    this.state.address = {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode
    }
    ProfileActions.saveCard(this.state.creditcard, this.state.cvn, this.state.month, this.state.year, this.state.owner, this.state.address, this.state.email, LoginStore.state.access_token, this.state.budget);  }

  render() {
    return (
      <div className="form-container">
        <form className="form">
          <div className="form-group">
            <input type="text" valueLink={linkState(this, 'creditcard')}placeholder="Creditcard" />
            <input type="text" valueLink={linkState(this, 'cvn')} placeholder="CVN" />
            <input type="text" valueLink={linkState(this, 'month')}placeholder="Expiration Month" />
            <input type="text" valueLink={linkState(this, 'year')} placeholder="Expiration Year" />
            <input type="text" valueLink={linkState(this, 'owner')}placeholder="Card Holder Name" />
            <input type="text" valueLink={linkState(this, 'address1')} placeholder="Address 1" />
            <input type="text" valueLink={linkState(this, 'address2')} placeholder="Address 2" />
            <input type="text" valueLink={linkState(this, 'city')} placeholder="City" />
            <input type="text" valueLink={linkState(this, 'state')} placeholder="State" />
            <input type="text" valueLink={linkState(this, 'zipCode')} placeholder="Zip Code" />
            <input type="text" valueLink={linkState(this, 'email')}placeholder="Email Address" />
            <input type="text" valueLink={linkState(this, 'budget')}placeholder="Budget" />
          </div>
          <button type="submit" onClick={this.saveCard.bind(this)}>Save</button>
        </form>
      </div>
    );
  }
}

export default Home;