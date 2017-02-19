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
      <div>
        <div className='col-md-2'>
        </div>
        <div className="form-container">
          <form className="form">

            <div className='col-md-4'>
              <div className="form-group">
                <label for="creditcard">Credit Card</label>
                <input type="text" valueLink={linkState(this, 'creditcard')}placeholder="Creditcard" id="creditcard" className="form-control" />
              </div>
              <div className="form-group">
                <label for="cvn">Security Code</label>
                <input type="text" valueLink={linkState(this, 'cvn')} placeholder="CVN" id="cvn" className="form-control" />
              </div>
              <div className="form-group">
                <label for="month">Expiration Month</label>
                <input type="text" valueLink={linkState(this, 'month')}placeholder="Expiration Month" id="month" className="form-control" />
              </div>
              <div className="form-group">
                <label for="year">Expiration Year</label>
                <input type="text" valueLink={linkState(this, 'year')} placeholder="Expiration Year" id="year" className="form-control" />
              </div>
              <div className="form-group">
                <label for="owner">Card Holder Name</label>
                <input type="text" valueLink={linkState(this, 'owner')}placeholder="Card Holder Name" id="owner" className="form-control" />
              </div>
              <div className="form-group">
                <label for="address1">Address 1</label>
                <input type="text" valueLink={linkState(this, 'address1')} placeholder="Address 1" id="address1" className="form-control" />
              </div>
            </div>

            <div className='col-md-4'>
              <div className="form-group">
                <label for="address2">Address 2</label>
                <input type="text" valueLink={linkState(this, 'address2')} placeholder="Address 2" id="address2" className="form-control" />
              </div>
              <div className="form-group">
                <label for="city">City</label>
                <input type="text" valueLink={linkState(this, 'city')} placeholder="City" id="city" className="form-control" />
              </div>
              <div className="form-group">
                <label for="state">State</label>
                <input type="text" valueLink={linkState(this, 'state')} placeholder="State" id="state" className="form-control" />
              </div>
              <div className="form-group">
                <label for="zipcode">Zip Code</label>
                <input type="text" valueLink={linkState(this, 'zipCode')} placeholder="Zip Code" id="zipcode" className="form-control" />
              </div>
              <div className="form-group">
                <label for="email">Email</label>
                <input type="text" valueLink={linkState(this, 'email')}placeholder="Email Address" id="email" className="form-control" />
              </div>
              <div className="form-group">
                <label for="budget">Budget</label>
                <input type="text" valueLink={linkState(this, 'budget')}placeholder="Budget" id="budget" className="form-control" />
              </div>
              <button type="submit" className="btn btn-default" onClick={this.saveCard.bind(this)}>Save</button>
            </div>

          </form>
        </div>
      </div>
    );
  }
}

export default Home;