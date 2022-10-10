import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

const MINIMUN_ASSERTIONS = 3;

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    return (
      <>
        <Header />
        {
          (assertions < MINIMUN_ASSERTIONS)
            ? (<h1 data-testid="feedback-text">Could be better...</h1>)
            : (<h1 data-testid="feedback-text">Well Done!</h1>)
        }
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
