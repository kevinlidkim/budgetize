import React from 'react';
import SaleItem from './SaleItem';
import ProfileStore from '../stores/ProfileStore'

class PurchaseHisory extends React.Component {
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

  onChange(state) {
  }

  render() {
    return (
      <div>
        You have purchased these items
      </div>
    );
  }
}

export default PurchaseHisory;