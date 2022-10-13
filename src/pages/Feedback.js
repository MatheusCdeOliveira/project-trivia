import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import md5 from "crypto-js/md5";
import Header from "../components/Header";

const MINIMUN_ASSERTIONS = 3;

class Feedback extends Component {
  resetAll = () => {
    const { history, name, score, email } = this.props;
    const hash = md5(email).toString();
    const currentRanking = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };
    const getOldRank = JSON.parse(localStorage.getItem("ranking")) || [];
    localStorage.setItem(
      "ranking",
      JSON.stringify([...getOldRank, currentRanking])
    );
    history.push("/");
  };

  showRanking = () => {
    const { history, name, score, email } = this.props;
    const hash = md5(email).toString();
    const currentRanking = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };
    const getOldRank = JSON.parse(localStorage.getItem("ranking")) || [];
    localStorage.setItem(
      "ranking",
      JSON.stringify([...getOldRank, currentRanking])
    );
    history.push("/ranking");
  };

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        {assertions < MINIMUN_ASSERTIONS ? (
          <h1 data-testid="feedback-text">Could be better...</h1>
        ) : (
          <h1 data-testid="feedback-text">Well Done!</h1>
        )}
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={this.resetAll}
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={this.showRanking}
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  email: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(Feedback);
