import React from 'react';
import ProfileActions from '../actions/ProfileActions';

class SaleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  buyItem(event) {
    event.preventDefault();
    ProfileActions.buyItem(this.props.item_name, this.props.price, this.props.payment_token, this.props.access_token);
  }

  render() {
    return (
      <div>
        <p>{this.props.item_name}</p>
        <p>{this.props.price}</p>
        <p>IMAGE HERE</p>
        <button type="submit" onClick={this.buyItem.bind(this)}>Purchase</button>
      </div>
    );
  }
}

export default SaleItem;