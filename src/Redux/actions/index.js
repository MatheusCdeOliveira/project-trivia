export const ADD_EMAIL = 'ADD_EMAIL';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const ADD_NAME = 'ADD_NAME';

export const addName = (payload) => ({
  type: ADD_NAME,
  payload,
});

export const ADD_SCORE = 'ADD_SCORE';

export const addScore = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const ADD_ASSERTION = 'ADD_ASSERTION';

export const addAssertion = (payload) => ({
  type: ADD_ASSERTION,
  payload,
});

export const RESET_GAME = 'RESET_GAME';

export const resetGame = (payload) => ({
  type: RESET_GAME,
  payload,
});

export const GRAVATAR_IMG = 'GRAVATAR_IMG';

export const getGravatarUrl = (url) => ({
  type: GRAVATAR_IMG,
  url,
});
