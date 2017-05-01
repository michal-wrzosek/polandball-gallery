import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import {
  search
} from '../actions';
import SearchForm from '../components/SearchForm';
import Images from '../components/Images';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this)
  }

  handleSearchFormSubmit(searchPhrase) {
    this.props.dispatch(search(searchPhrase));
  }

  render() {
    const {
      images,
    } = this.props;

    return (
      <div>
        Homepage
        <div>
          <SearchForm onSubmit={this.handleSearchFormSubmit} />
          <Images images={images} />
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  images: ImmutablePropTypes.listOf(ImmutablePropTypes.map).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    images: state.images,
  };
}

export default connect(mapStateToProps)(Homepage);
