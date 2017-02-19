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
        <SaleItem budget={ProfileStore.state.budget} item_name="Paul Fodor" price="$114" item_url="http://i.imgur.com/cLaG8eK.jpg" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
        <br />
        <SaleItem budget={ProfileStore.state.budget} item_name="Girlfriend" price="$50" item_url="http://i.imgur.com/XyvrNud.jpg" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
        <br />
        <SaleItem budget={ProfileStore.state.budget} item_name="Laptop" price="$300" item_url="http://i.imgur.com/oLity5W.png" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
        <br />
        <SaleItem budget={ProfileStore.state.budget} item_name="Stick" price="$1" item_url="http://i.imgur.com/LWMKlBR.png" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
        <br />
        <SaleItem budget={ProfileStore.state.budget} item_name="Gunnars" price="$214" item_url="http://i.imgur.com/KfmkahA.jpg" payment_token={ProfileStore.state.payment_token} access_token={LoginStore.state.access_token}/>
      </div>
    );
  }
}

export default Purchase;