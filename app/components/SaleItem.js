import React from 'react';
import ProfileActions from '../actions/ProfileActions';
import ProfileStore from '../stores/ProfileStore';
import LoginStore from '../stores/LoginStore';


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
      ProfileActions.buyItem(this.props.item_name, this.props.price, this.props.payment_token, this.props.access_token, LoginStore.state.user);
    } else {
      alert("Insufficient funds");
      // console.log("YOU DONT HAVE ENOUGH MONEY");
    }
  }

  render() {
    return (
      <div className="alert alert-info">
        <h4>{this.props.item_name}</h4>
        <img src={this.props.item_url} className="rounded" style={{maxWidth: 400}}></img>
        <h5>{this.props.price}</h5>
        <button type="submit" className="btn btn-default" onClick={this.buyItem.bind(this)}>Purchase</button>
      </div>
    );
  }
}

export default SaleItem;