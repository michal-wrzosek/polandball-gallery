import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import Images from '../components/Images';

class Homepage extends Component {

  render() {
    const {
      images,
    } = this.props;

    return (
      <div>
        Homepage
        <div>
          <Images images={images} />
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  images: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
};

function mapStateToProps(state) {
  return {
    images: state.images,
  };
}

export default connect(mapStateToProps)(Homepage);
