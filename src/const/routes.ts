export const CARD_ID_PARAM = 'cardId';

export const CARD_ROUTES = {
  MAIN: '/cards',
  LIKES: '/likes',
  BY_ID: `/:${CARD_ID_PARAM}`,
};

export const USER_ID_PARAM = 'userId';

export const USER_ROUTES = {
  MAIN: '/users',
  PROFILE: '/me',
  AVATAR: '/avatar',
  BY_ID: `/:${USER_ID_PARAM}`,
};

export const AUTH_ROUTES = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
};
