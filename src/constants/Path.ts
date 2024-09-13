const BROWSER_PATH = {
  OAUTH: {
    GOOGLE: '/login/oauth2/code/google',
  },
  LANDING: '/',
  CALENDAR: '/calendar',
  NOT_FOUND: '*',
  GROUP: {
    BASE: '/group',
    DETAIL: '/group/:groupId?',
  },
  REVIEW: {
    BASE: '/review',
    WRITE: '/review/write/:scheduleId',
    DETAIL: '/review/:reviewId',
    MODIFY: '/review/modify/:scheduleId/:reviewId',
  },
};

export { BROWSER_PATH };
