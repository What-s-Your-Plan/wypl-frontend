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

const GROUP = {
  V1: {
    GROUPS: {
      BASE: '/group/v1/groups',
      GROUP_ID: '/group/v1/groups/:groupId',
      MEMBER: {
        BASE: '/group/v1/groups/members',
        WITHDRAW: '/group/v1/groups/:groupId/members',
        FORCE_OUT: '/group/v1/groups/:groupId/members/force-out',
        PERSONAL_COLOR: '/group/v1/groups/:groupId/members/colors',
        INVITE: '/group/v1/groups/:groupId/members/invitation',
      },
    },
  },
};

const LABEL = {
  V1: {
    LABELS: {
      BASE: '/label/v1/labels',
      MAIN: '/label/v1/labels/main',
    },
  },
};

const MEMBER = {
  V1: {
    MEMBERS: {
      BASE: '/member/v1/members',
      COLOR: '/member/v1/members/colors',
      NICKNAME: '/member/v1/members/nickname',
      PROFILE_IMAGE: '/member/v1/members/profile-image',
    },
  },
};

export { AUTH, CALENDAR, GROUP, LABEL, MEMBER };
