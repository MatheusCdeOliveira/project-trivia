import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail, addName, resetGame } from '../Redux/actions';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetGame());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { inputEmail, inputName } = this.state;
      const validEmail = inputEmail.length > 0;
      const validName = inputName.length > 0;
      const enableButton = !(validEmail && validName);
      this.setState({ isDisabled: enableButton });
    });
  };

  getAPI = async () => {
    const response = await fetch(
      'https://opentdb.com/api_token.php?command=request',
    );
    const data = await response.json();
    return data.token;
  };

  handleCLick = async () => {
    const { dispatch, history } = this.props;
    const { inputName, inputEmail } = this.state;
    dispatch(addEmail(inputEmail));
    dispatch(addName(inputName));
    const token = await this.getAPI();
    localStorage.setItem('token', token);
    history.push('/jogo');
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled, inputEmail, inputName } = this.state;
    return (
      <div
        className="h-screen bg-gray-800
       flex min-h-full
        items-center justify-center py-12 px-4
         sm:px-6 lg:px-8"
      >
        <div className="w-full max-w-md space-y-8">
          <h2
            className="mt-6
           text-center text-3xl
            font-bold tracking-tight
             text-gray-100"
          >
            Sign in the game
          </h2>
          <form className="mt-8 space-y-6">
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-input" className="sr-only">
                  Email:
                </label>
                <input
                  data-testid="input-gravatar-email"
                  type="text"
                  id="email-input"
                  placeholder="Gravatar email address"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  name="inputEmail"
                  value={ inputEmail }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                <label
                  htmlFor="input-player-name"
                  className="sr-only"
                >
                  Name:
                </label>
                <input
                  data-testid="input-player-name"
                  type="text"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  name="inputName"
                  value={ inputName }
                  onChange={ this.handleChange }
                  placeholder="What's your name?"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={ this.handleCLick }
              disabled={ isDisabled }
              data-testid="btn-play"
              className="group
              relative flex w-full
               justify-center rounded-md
                border border-transparent
                 bg-green-400 py-2 px-4
                  text-sm font-medium
                   text-white hover:bg-green-600
                    focus:outline-none focus:ring-2
                     focus:ring-indigo-500 focus:ring-offset-2"
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              onClick={ this.handleSettings }
              className="group
               relative flex w-full
                justify-center rounded-md
                 border border-transparent
                  bg-green-400 py-2 px-4 text-sm font-medium
                   text-white hover:bg-green-600 focus:outline-none
                    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Settings
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default connect()(Login);
