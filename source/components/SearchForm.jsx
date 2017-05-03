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

  render() {
    const b = 'search-form';

    return (
      <form
        className={ bem(b) }
        onSubmit={ this.handleSearchSubmit }
      >

        {/* WRAPPER */}
        <div className={ bem(b, 'wrapper') }>

          {/* INPUT FIELD */}
          <input
            className={ bem(b, 'input-field') }
            onChange={ this.handleInputChange }
            type='text'
            placeholder='Search for particular polandballs...'
          />

          {/* SUBMIT BUTTON */}
          <span className={ bem(b, 'submit') }>
            <button
              className={ bem(b, 'submit-btn') }
              type='submit'
            >
              Search
            </button>
          </span>
        </div>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
