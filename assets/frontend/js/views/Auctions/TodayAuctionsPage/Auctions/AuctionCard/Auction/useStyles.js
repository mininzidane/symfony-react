import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    width: '100%',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25);',

    '&:nth-child(n)': {
      marginTop: 10,
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 60,
    padding: [[10, 24]],

    [breakpoints.down('sm')]: {
      padding: [[10, 16, 12, 20]],
    },
  },
  firstBlock: {
    paddingRight: 10,
    width: 160,

    [breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      flexGrow: 1,
    },
  },
  time: {
    ...mixins.font(18, 22),
    textTransform: 'uppercase',

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 19),
      paddingRight: 8,
    },
  },
  timer: {
    ...mixins.font(12, 20),
    marginTop: 2,
  },
  description: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  location: {
    ...mixins.font(18, 22, 700),
  },
  saleHighlights: {
    ...mixins.font(12, 17),
    marginTop: 1,
    color: '#4B5158',
  },
  viewAllItems: {
    ...mixins.font(14, 19),
    marginLeft: 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  subheader: {
    ...mixins.font(8, 22, 700),
    display: 'flex',
    height: 22,
    textTransform: 'uppercase',
    paddingLeft: 184,

    '& > div:first-child': {
      minWidth: 40,
      marginRight: 32,

      [breakpoints.down('sm')]: {
        marginRight: 15,
      },
    },

    [breakpoints.down('sm')]: {
      paddingLeft: 20,
    },
  },
  entries: {
    padding: [[12, 0]],
  },
  entry: {
    display: 'flex',
    alignItems: 'center',
    padding: [[6, 24, 6, 184]],

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },

    [breakpoints.down('sm')]: {
      paddingLeft: 20,
      paddingRight: 16,
    },

    '& > div:first-child': {
      minWidth: 40,
    },

    '& > div': {
      marginRight: 32,

      [breakpoints.down('sm')]: {
        marginRight: 15,
      },
    },

    '& > div:last-child': {
      marginRight: 0,
    },
  },
}));
