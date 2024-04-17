import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#fff',
    maxWidth: 510,
    width: '100%',
    margin: 'auto',
    padding: [[25, 24]],
    borderRadius: 4,

    [breakpoints.down('sm')]: {
      maxWidth: 'none',
      padding: [[25, 14]],
    },
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginBottom: 25,
    marginTop: 0,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 27),
      marginBottom: 25,
    },
  },
  subtitle: {
    ...mixins.font(14, 19, 300),
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  registerLinkContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 23,
    textAlign: 'center',
  },
  registerLink: {
    position: 'relative',
    display: 'inline-block',
    textDecoration: 'none !important',
    color: '#333333',

    '&:hover::after': {
      opacity: 0,
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -3,
      left: 0,
      width: '100%',
      height: 6,
      borderBottom: '1px dashed #999999',
    },
  },
}));
