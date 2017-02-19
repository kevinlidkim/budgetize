import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
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
    NavbarStore.listen(this.onChange);
    ProfileStore.listen(this.onChange);
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState({budget: ProfileStore.state.budget});
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
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
          <form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder='Search' value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>
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