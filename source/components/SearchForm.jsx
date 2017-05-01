import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bem from '../helpers/bem';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { searchPhrase: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({ searchPhrase: e.target.value });
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.searchPhrase);
  }

  render () {
    const b = 'search-form';

    const {
      onSubmit,
    } = this.props;

    return (
      <form
        className={bem(b)}
        onSubmit={this.handleSearchSubmit}
      >

        {/* INPUT FIELD */}
        <input
          className={bem(b, 'input-field')}
          onChange={this.handleInputChange}
          type="text"
        />

        {/* SUBMIT BUTTON */}
        <button
          className={bem(b, 'submit-btn')}
          type="submit"
        >
          Search
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;