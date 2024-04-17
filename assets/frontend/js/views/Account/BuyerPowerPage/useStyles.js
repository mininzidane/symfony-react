import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  container: {
    paddingTop: 15,
  },
  caption: {
    ...mixins.font(24, 30, 400),
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    color: '#333',

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 22),
    },

    '& a': {
      marginRight: 8,
      flexShrink: 0,
      width: 12,

      [breakpoints.down('sm')]: {
        marginTop: 0,
      },

      '& img': {
        display: 'block',
      },

      '&:hover': {
        opacity: 0.6,
      },
    },
  },
  notificationContainer: {
    display: 'flex',
    flexWrap: 'wrap',

    '& .notifications-banner': {
      paddingBottom: 15,
    },

    '&:not(:first-child) .notifications-banner': {
      paddingTop: 10,
    },

    '& > div': {
      width: '100%',
    },

    '&:empty': {
      display: 'none',
    },
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: '5fr 3fr',
    alignItems: 'start',
    gridGap: 20,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  tabsContainer: {
    marginTop: 80,
    paddingBottom: 70,

    [breakpoints.down('sm')]: {
      marginTop: 40,
      paddingBottom: 40,
    },
  },
  tabsCaption: {
    margin: 0,
    ...mixins.font(24, 30, 300),
    color: '#333',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
    },
  },
  deposits: {
    marginTop: 40,
    paddingBottom: 30,

    [breakpoints.down('sm')]: {
      paddingBottom: 10,
      marginTop: 35,
    },
  },
  depositsTitle: {
    paddingBottom: 12,
    ...mixins.font(24, 32),

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24),
    },
  },
}));
