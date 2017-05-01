import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getImages,
} from '../actions';
import Menu from './Menu';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(getImages());
  }

  render() {
    const {
      isLoading,
      children,
    } = this.props;

    return (
      <div className='App'>
        <Menu />
        {isLoading === true &&
          <p>LOADING!!!</p>
        }

        <div className='Page'>
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
  }
}

export default connect(mapStateToProps)(App);
