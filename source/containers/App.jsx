import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import bem from '../helpers/bem';
import {
  getGalleries,
} from '../actions';
import Menu from './Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getGalleries());
  }

  handleMenuClick(path) {
    this.props.dispatch(push(path));
  }

  render() {
    const {
      isLoading,
      children,
    } = this.props;

    const b = 'app';

    return (
      <div className={ bem(b) }>
        
        {/* MENU */}
        <div className={ bem(b, 'menu') }>
          <Menu handleClick={ this.handleMenuClick } />
        </div>

        {/* CONTENT */}
        <div className={ bem(b, 'content') }>
          { children }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const {
    app,
  } = state;

  return {
    isLoading: app.get('isLoading'),
  };
}

export default connect(mapStateToProps)(App);
