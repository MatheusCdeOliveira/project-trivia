import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.setState({ ranking });
  }

  home = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.home }
        >
          Inicio

        </button>
        <section>
          {ranking?.map((element, index) => (
            <div name={ element.score } key={ index }>
              <p data-testid={ `player-name-${index}` }>{element.name}</p>
              <p data-testid={ `player-score-${index}` }>{element.score}</p>
              <img src={ element.picture } alt={ element.name } />
            </div>
          )).sort((a, b) => b.props.name - a.props.name)}
        </section>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Ranking);
