import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {
  search,
} from '../actions';
import SearchForm from '../components/SearchForm';
import Galleries from '../components/Galleries';

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.handleSearchFormSubmit = this.handleSearchFormSubmit.bind(this);
    this.handleImageClick = this.handleImageClick.bind(this);
  }

  handleSearchFormSubmit(searchPhrase) {
    this.props.dispatch(search(searchPhrase));
  }

  handleImageClick(id) {
    this.props.dispatch(push(`/galleries/${ id }`));
  }

  render() {
    const {
      galleries,
    } = this.props;

    return (
      <div>
        Homepage
        <div>
          <SearchForm onSubmit={ this.handleSearchFormSubmit } />
          <Galleries
            galleries={ galleries }
            handleClick={ this.handleImageClick }
          />
        </div>
      </div>
    );
  }
}

Homepage.propTypes = {
  galleries: ImmutablePropTypes.mapContains({
    list: ImmutablePropTypes.list,
    keys: ImmutablePropTypes.map
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    galleries: state.galleries,
  };
}

export default connect(mapStateToProps)(Homepage);
