import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  search,
  getGalleries,
} from '../actions';
import SearchForm from '../components/SearchForm';
import Galleries from '../components/Galleries';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleLoadMoreGalleries = this.handleLoadMoreGalleries.bind(this);
  }

  handleSearchFormSubmit(searchPhrase) {
    this.props.dispatch(search(searchPhrase));
  }

  handleImageClick(id) {
    this.props.dispatch(push(`/galleries/${ id }`));
  }

  handleLoadMoreGalleries() {
    const nextPage = this.props.galleries.get('currentPage') + 1;
    const searchPhrase = this.props.galleries.get('searchPhrase');
    this.props.dispatch(getGalleries(nextPage, searchPhrase));
  }

  render() {
    const {
      galleries,
    } = this.props;

    return (
      <div>
        <SearchForm onSubmit={ this.handleSearchFormSubmit } />
        <Galleries
          galleries={ galleries }
          handleClick={ this.handleImageClick }
          handleLoadMore={ this.handleLoadMoreGalleries }
        />
      </div>
    );
  }
}

Homepage.propTypes = {
  galleries: ImmutablePropTypes.mapContains({
    list: ImmutablePropTypes.list.isRequired,
    keys: ImmutablePropTypes.map.isRequired,
    hasMore: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    galleries: state.galleries,
  };
}

export default connect(mapStateToProps)(Homepage);
