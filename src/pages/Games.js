import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import trivia from '../trivia.png';

class Games extends Component {
  state = {
    responseAPI: {},
    answers: [],
    index: 0,
    correctAnswer: '',
    answered: false,
  };

  componentDidMount() {
    this.getQuiz();
  }

  getAnswers = () => {
    const { responseAPI, index } = this.state;
    const correctAnswer = responseAPI[index].correct_answer;
    const incorrectAnswers = responseAPI[index].incorrect_answers;
    const POINT_FIVE = 0.5;
    const answers = [...incorrectAnswers, correctAnswer]
      .sort(() => POINT_FIVE - Math.random());
    this.setState({ answers, correctAnswer });
  };

  getQuiz = async () => {
    const token = localStorage.getItem('token');
    const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const response = await request.json();
    if (response.response_code !== 0) {
      const { history } = this.props;
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ responseAPI: response.results }, () => {
      this.getAnswers();
    });
  };

  handleAnswerButt = () => {
    this.setState({ answered: true });
  };

  render() {
    const { responseAPI, answers, index, correctAnswer, answered } = this.state;
    return (
      <>
        <Header />
        <img src={ trivia } alt="header-Img" width="600" height="200" />
        {responseAPI.length > 0
          && (
            <div>
              <p data-testid="question-category">{responseAPI[index].category}</p>
              <p data-testid="question-text">{responseAPI[index].question}</p>
              { answered
                ? answers.map((answer, i) => (
                  <div key={ i } data-testid="answer-options">
                    <button
                      data-testid={ correctAnswer === answer
                        ? 'correct-answer' : `wrong-answer-${i}` }
                      type="button"
                      onClick={ this.handleAnswerButt }
                      className={ correctAnswer === answer
                        ? 'correctanswer' : 'wronganswer' }
                    >
                      { answer }
                    </button>
                  </div>
                ))
                : answers.map((answer, i) => (
                  <div key={ i } data-testid="answer-options">
                    <button
                      data-testid={ correctAnswer === answer
                        ? 'correct-answer' : `wrong-answer-${i}` }
                      type="button"
                      onClick={ this.handleAnswerButt }
                    >
                      { answer }
                    </button>
                  </div>
                ))}
            </div>
          )}
      </>
    );
  }
}

Games.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default Games;
