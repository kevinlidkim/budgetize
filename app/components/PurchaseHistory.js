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
      return <li>{purchase}</li>
    })

    return (
      <div>
        <p>You have purchased these items</p>
        <ul>{purchase_list}</ul>
        <button type="submit" onClick={this.getData.bind(this)}>Update Data</button>
      </div>
    );
  }
}

export default PurchaseHistory;