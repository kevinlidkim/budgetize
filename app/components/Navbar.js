import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: ''
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
    this.setState({budget: ProfileStore.state.budget});
  }

  render() {
    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <Link to='/' className='navbar-brand'>
            Budgetize
            <span className='badge badge-up badge-danger'>{this.state.budget}</span>
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/purchase'>Purchase</Link></li>
            <li><Link to='/purchase_history'>Purchase History<span className='badge badge-up badge-danger'>{ProfileStore.state.purchases.length}</span></Link></li> 
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;