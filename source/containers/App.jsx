import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import bem from '../helpers/bem';
import Menu from '../components/Menu';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(path) {
    this.props.dispatch(push(path));
  }

  render() {
    const {
      children,
    } = this.props;

    const b = 'app';

    return (
      <div className={ bem(b) }>

        {/* MENU */}
        <div className={ bem(b, 'menu') }>
          <Menu
            elements={ [{ name: 'Polandballs', path: '/' }] }
            handleClick={ this.handleMenuClick }
          />
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
  children: PropTypes.element.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
