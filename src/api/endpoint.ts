const AUTH = {
  V1: {
    LOGOUT: '/auth/v1/logout',
    REISSUE: '/auth/v1/reissue',
    SIGN_IN: {
      BASE: '/auth/v1/sign-in',
      MOCK: '/auth/v1/sign-in/mock',
    },
  },
};

const CALENDAR = {
  V1: {
    CALENDARS: {
      BASE: '/calendar/v1/calendars',
    },
  },
};

export { AUTH, CALENDAR };
