import React, { Component } from 'react';
import Header from '../components/Header';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Feedback extends Component {
//   state = {
//     profileImg: '',
//   };

  render() {
    return (
      <>
        <Header />
        <p data-testid="feedback-text">FeedBack!</p>
      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.player.gravatarEmail,
//   name: state.player.name,
//   score: state.player.score,
// });

// Header.propTypes = {
//   email: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
// };

export default Feedback;
