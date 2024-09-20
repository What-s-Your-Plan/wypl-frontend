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
      BASE: '/Calendar/v1/calendars',
    },
  },
};

const FILE = {
  V1: {
    IMAGE: '/file/v1/images',
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

const NOTIFICATION = {
  V1: {
    NOTIFICATIONS: {
      BASE: '/notification/v1/notifications',
    },
  },
};

const REVIVE = {
  V1: {
    REVIEWS: {
      BASE: '/revive/v1/revives',
      DETAIL: '/revive/v1/revives/detail',
    },
  },
};

const SCHEDULE = {
  V1: {
    SCHEDULES: {
      BASE: '/schedule/v1/schedules',
      DETAIL: '/schedule/v1/schedules/detail',
    },
  },
};

const TODO = {
  V1: {
    TODOS: {
      BASE: '/todo/v1/todos',
      CHECK: '/todo/v1/todos/check',
    },
  },
};

const SIDE = {
  V1: {
    WEATHER: '/side/v1/weathers',
    D_DAY: '/side/v1/d-day',
    GOAL: '/side/v1/goals',
    MEMO: '/side/v1/memo',
  },
};

export {
  AUTH,
  CALENDAR,
  FILE,
  GROUP,
  LABEL,
  MEMBER,
  NOTIFICATION,
  REVIVE,
  SCHEDULE,
  TODO,
  SIDE,
};
