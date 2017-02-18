import React from 'react';
import SaleItem from './SaleItem';
import ProfileStore from '../stores/ProfileStore'
import LoginStore from '../stores/LoginStore'

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
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
    LoginStore.unlisten(this.onChange);
  }

  onChange(state) {
  }

  render() {
    return (
      <div>
        PURCHASE THESE ITEMS
        <SaleItem budget={ProfileStore.state.budget} item_name="Girlfriend" price="$50" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
        <SaleItem budget={ProfileStore.state.budget} item_name="Laptop" price="$300"/>
      </div>
    );
  }
}

export default Purchase;