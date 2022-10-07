import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    isDisabled: true,
    redirect: false,
  };

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
    const token = await this.getAPI();
    localStorage.setItem('token', token);
    this.setState({ redirect: true });
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisabled, redirect, inputEmail, inputName } = this.state;
    return (
      <div>
        {redirect && <Redirect to="/jogo" />}
        <form>
          <label htmlFor="email-input">
            Email:
            <input
              data-testid="input-gravatar-email"
              type="text"
              name="inputEmail"
              value={ inputEmail }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-player-name">
            Name:
            <input
              data-testid="input-player-name"
              type="text"
              name="inputName"
              value={ inputName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleCLick }
            disabled={ isDisabled }
            data-testid="btn-play"
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default Login;
