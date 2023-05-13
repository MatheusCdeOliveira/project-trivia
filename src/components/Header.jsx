import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    profileImg: '',
  };

  componentDidMount() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({
      profileImg: `https://www.gravatar.com/avatar/${hash}`,
    });
  }

  render() {
    const { name, score } = this.props;
    const { profileImg } = this.state;
    return (
      <header className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-2 rounded-lg border-gray-500 py-1 md:justify-evenly bg-green-700 md:space-x-10">
          <h1 data-testid="header-player-name" className="font-serif text-2xl text-white underline shadow-md">{name}</h1>
          <img
            data-testid="header-profile-picture"
            src={ profileImg }
            alt="profile-img"
          />
          <h2 data-testid="header-score" className="font-serif text-2xl text-white">
            {`Score: ${score}`}
          </h2>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
