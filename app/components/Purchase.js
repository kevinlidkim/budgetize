import React from 'react';
import SaleItem from './SaleItem';
import ProfileStore from '../stores/ProfileStore'
import LoginStore from '../stores/LoginStore'
import PurchaseStore from '../stores/PurchaseStore'

class Purchase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payment_token: '',
      access_token: ''
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    LoginStore.listen(this.onChange);
    PurchaseStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
    LoginStore.unlisten(this.onChange);
    PurchaseStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({access_token: LoginStore.state.access_token});
    this.setState({payment_token: ProfileStore.state.payment_token});
  }

  render() {
    return (
      <div>
        PURCHASE THESE ITEMS
        <SaleItem item_name="Girlfriend" price="$50" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
        <SaleItem item_name="Laptop" price="$300"/>
      </div>
    );
  }
}

export default Purchase;