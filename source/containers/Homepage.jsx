import React, { Component } from 'react';
import { connect } from 'react-redux';

class Homepage extends Component {

  render() {
    return (
      <div>
        Homepage
      </div>
    );
  }
}

Homepage.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Homepage);
