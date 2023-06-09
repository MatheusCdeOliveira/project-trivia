/* eslint-disable max-len */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import trivia from '../trivia.png';
import { addAssertion, addScore } from '../Redux/actions';

const SECOND = 1000;
const SCORE = 10;
const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const MAX_QUESTIONS = 4;

class Games extends Component {
  state = {
    index: 0,
    responseAPI: {},
    answers: [],
    correctAnswer: '',
    answered: false,
    timer: 30,
  };

  componentDidMount() {
    this.getQuiz();
    this.resetTimer();
  }

  resetTimer = () => {
    if (this.idInterval) clearInterval(this.idInterval);
    this.setState({ timer: 30, answered: false }, () => {
      const thisIdInterval = setInterval(() => {
        this.setState(
          (prevState) => ({
            timer: prevState.timer - 1,
          }),
          () => {
            const { timer } = this.state;
            if (timer === 0) {
              clearInterval(thisIdInterval);
              this.setState({ answered: true });
            }
          },
        );
      }, SECOND);
      this.idInterval = thisIdInterval;
    });
  };

  getAnswers = () => {
    const { responseAPI, index } = this.state;
    const correctAnswer = responseAPI[index].correct_answer;
    const incorrectAnswers = responseAPI[index].incorrect_answers;
    const POINT_FIVE = 0.5;
    const answers = [...incorrectAnswers, correctAnswer].sort(
      () => POINT_FIVE - Math.random(),
    );
    this.setState({ answers, correctAnswer });
  };

  getQuiz = async () => {
    const token = localStorage.getItem('token');
    const request = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
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

  handleAnswerButt = (answer) => {
    const { dispatch } = this.props;
    const { correctAnswer, responseAPI, index, timer } = this.state;
    const { difficulty } = responseAPI[index];
    const scoreValue = this.calculateScore(timer, difficulty);
    this.setState({ answered: true }, () => {
      clearInterval(this.idInterval);
      if (answer === correctAnswer) {
        dispatch(addScore(scoreValue));
        dispatch(addAssertion());
      }
    });
  };

  calculateScore = (timer, difficulty) => {
    if (difficulty === 'easy') return SCORE + timer * EASY;
    if (difficulty === 'medium') return SCORE + timer * MEDIUM;
    if (difficulty === 'hard') return SCORE + timer * HARD;
  };

  handleNextButt = () => {
    const { index } = this.state;
    const { history } = this.props;
    if (index === MAX_QUESTIONS) history.push('/feedback');
    this.setState(
      (prevState) => ({ index: prevState.index + 1 }),
      () => {
        this.resetTimer();
        this.getAnswers();
      },
    );
  };

  render() {
    const { responseAPI, answers, index, correctAnswer, answered, timer } = this.state;
    return (
      <section className="bg-gray-600 h-screen">
        <Header />
        <img className="md:mx-auto md:p-10" src={ trivia } alt="header-Img" width="600" height="200" />
        <p className="lg:text-5xl text-red-700">{timer}</p>
        {responseAPI.length > 0 && (
          <div>
            <p data-testid="question-category" className="lg:text-2xl text-white">{responseAPI[index].category}</p>
            {responseAPI.length && (
              <p data-testid="question-text" className="lg:text-xl text-green-600">{responseAPI[index].question}</p>
            )}
            {answered ? (
              <>
                <div data-testid="answer-options">
                  {answers.map((answer, i) => (
                    <button
                      key={ i }
                      data-testid={
                        correctAnswer === answer
                          ? 'correct-answer'
                          : `wrong-answer-${i}`
                      }
                      type="button"
                      className={
                        correctAnswer === answer
                          ? 'correctanswer'
                          : 'wronganswer'
                      }
                      disabled
                    >
                      {answer}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  data-testid="btn-next"
                  className="text-white border-1 bg-black md:-mt-12 rounded-xl w-60"
                  onClick={ this.handleNextButt }
                >
                  Next
                </button>
              </>
            ) : (
              <div data-testid="answer-options">
                {answers.map((answer, i) => (
                  <button
                    key={ i }
                    data-testid={
                      correctAnswer === answer
                        ? 'correct-answer'
                        : `wrong-answer-${i}`
                    }
                    type="button"
                    onClick={ () => this.handleAnswerButt(answer) }
                  >
                    {answer}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    );
  }
}

Games.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default connect()(Games);
