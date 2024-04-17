import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  container: {
    padding: [[40, 0, 42]],

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 25]],
    },
  },
  wrapper: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    [breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
  descriptionTitle: {
    ...mixins.font(32, 46),
    color: '#333333',
    maxWidth: 530,
    paddingLeft: 36,
    paddingTop: 80,

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 30),
      marginTop: 25,
      paddingTop: 0,
      paddingLeft: 0,
    },
  },
  description: {
    marginRight: 62,
    overflow: 'hidden',

    [breakpoints.down('md')]: {
      marginRight: 25,
    },

    [breakpoints.down('sm')]: {
      marginRight: 0,
      width: 480,
      maxWidth: 'calc(100% - 28px)',
    },
  },
  descriptionList: {
    '& > div': {
      marginTop: 22,
      fontSize: 18,
    },

    [breakpoints.down('sm')]: {
      padding: '0 !important',
      marginTop: 22,
    },
  },
  form: {
    marginLeft: 62,
    marginRight: 36,

    '& > div': {
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
      borderRadius: 4,
    },

    [breakpoints.down('md')]: {
      marginLeft: 0,
    },

    [breakpoints.down('sm')]: {
      margin: [[0, 14]],
      marginTop: 24,
      width: 480,
      maxWidth: 'calc(100% - 28px)',
    },
  },
}));
