import React from 'react';
import ProfileActions from '../actions/ProfileActions';
import ProfileStore from '../stores/ProfileStore';

class SaleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  buyItem(event) {
    event.preventDefault();

    var budget = parseInt(ProfileStore.state.budget)
    var price = Number(this.props.price.replace(/[^0-9\.]+/g,""));

    if (budget > price) {
      ProfileActions.buyItem(this.props.item_name, this.props.price, this.props.payment_token, this.props.access_token);
    } else {
      alert("get some money kid");
      // console.log("YOU DONT HAVE ENOUGH MONEY");
    }
  }

  render() {
    return (
      <div>
        <img src={this.props.item_url}></img>
        <p>{this.props.item_name}</p>
        <p>{this.props.price}</p>
        <button type="submit" onClick={this.buyItem.bind(this)}>Purchase</button>
      </div>
    );
  }
}

export default SaleItem;