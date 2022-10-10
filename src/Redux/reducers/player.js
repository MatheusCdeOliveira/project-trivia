import { ADD_EMAIL, ADD_NAME, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '', // nome - da - pessoa,
  assertions: 0, // número - de - acertos,
  score: 0, // pontuação
  gravatarEmail: '', // email - da - pessoa,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
}

export default player;
