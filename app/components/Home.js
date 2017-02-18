import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

    // grab user from loginstore

  render() {
    return (
      <div className='alert alert-info'>
        Hello from Home Component
      </div>
    );
  }
}

export default Home;