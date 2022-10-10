import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { resetGame } from '../Redux/actions';

const MINIMUN_ASSERTIONS = 3;

class Feedback extends Component {
  resetAll = () => {
    const { dispatch, history } = this.props;
    dispatch(resetGame());
    history.push('/');
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        {
          (assertions < MINIMUN_ASSERTIONS)
            ? (<h1 data-testid="feedback-text">Could be better...</h1>)
            : (<h1 data-testid="feedback-text">Well Done!</h1>)
        }
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.resetAll }
        >
          Play Again
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Feedback);
