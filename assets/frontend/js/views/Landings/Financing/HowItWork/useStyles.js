import { makeStyles } from '@material-ui/core/styles';
import CheckMark from './img/chack-mark.svg';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#fff',
    ...mixins.font(24, 32, 400),
    paddingTop: 30,
    paddingBottom: 52,

    [breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
  title: {
    marginBottom: 33,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
  content: {
    ...mixins.font(18, 24, 300),
  },
  line: {
    display: 'flex',
    justifyContent: 'center',

    '&:not(:last-child)': {
      marginBottom: 33,

      [breakpoints.down('sm')]: {
        marginBottom: 0,
      },
    },

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  cell: {
    position: 'relative',
    maxWidth: 400,
    flexGrow: 1,
    flexBasis: '50%',
    paddingLeft: 22,

    '&:first-child': {
      marginRight: 50,

      [breakpoints.down('sm')]: {
        marginRight: 0,
        marginBottom: 24,
      },
    },

    '&:last-child': {
      marginLeft: 50,

      [breakpoints.down('sm')]: {
        marginLeft: 0,
        marginBottom: 24,
      },
    },

    '&:before': {
      content: '""',
      backgroundImage: `url(${CheckMark})`,
      position: 'absolute',
      left: 0,
      top: 6,
      width: 22,
      height: 12,
      backgroundRepeat: 'no-repeat',
    },
  },
}));
