import React from 'react';
import SaleItem from './SaleItem';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import LoginStore from '../stores/LoginStore';


class PurchaseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purchases: []
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  getData(event) {
    ProfileActions.getTransactions(LoginStore.state.user, LoginStore.state.access_token);
  }

  onChange(state) {
    this.setState({purchases: ProfileStore.state.purchases});
    // console.log(this.state.purchases);
  }

  render() {
    var purchase_history = ProfileStore.state.purchases;
    var purchase_list = purchase_history.map(function(purchase) {
      return <li className="list-group-item">{purchase}</li>
    })

    return (
      <div>
        <div className='col-md-4'>
        </div>
        <div className='col-md-4 text-center'>
          <h3>You have purchased these items</h3>
          <ul className="list-group">{purchase_list}</ul>
          <button type="submit" className="btn btn-default" onClick={this.getData.bind(this)}>Update Data</button>
        </div>
      </div>
    );
  }
}

export default PurchaseHistory;