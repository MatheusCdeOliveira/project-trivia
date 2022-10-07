const INITIAL_STATE = {
  name: '', // nome - da - pessoa,
  assertions: 0, // número - de - acertos,
  score: 0, // pontuação
  gravatarEmail: '', // email - da - pessoa,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default player;
