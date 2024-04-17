import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(16, 20, 400),
    display: 'flex',
    alignItems: 'center',
    padding: [[5, 15]],
    minHeight: 40,
    color: '#333',
    borderRadius: 20,
    whiteSpace: 'nowrap',
    transition: 'background-color .15s ease, color .15s ease, border-color .15s ease',

    [breakpoints.down('md')]: {
      minHeight: 30,
      fontSize: 12,
      padding: [[4, 12]],
    },
  },
  rest: {
    backgroundColor: '#FFFFFF',
    border: '1px solid #BDBDBD',
    boxShadow: 'inset 0px 1px 4px transparent',
    cursor: 'pointer',

    '&:hover': {
      color: '#2158F5',
      borderColor: '#2158F5',
    },

    '&:active': {
      backgroundColor: '#E0E0E0',
      borderColor: '#9E9E9E',
      boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.25)',
      color: '#333',
    },
  },
  active: {
    position: 'relative',
    backgroundColor: '#E0E0E0',
    paddingRight: 38,
    cursor: 'default',

    [breakpoints.down('md')]: {
      paddingRight: 34,
    },
  },
  cross: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 9,
    right: 8,
    width: '22px !important',
    height: '22px !important',
    backgroundColor: '#F3F3F3',
    borderRadius: '50%',
    boxShadow: '0px 2px 3px transparent',
    transition: 'box-shadow .15s ease, opacity .15s ease, background-color .15s ease',

    [breakpoints.down('md')]: {
      top: 4,
      right: 4,
    },

    '&:after': {
      top: -5,
      right: -5,
      bottom: -5,
      left: -5,
    },

    '& img': {
      opacity: 0.7,
    },

    '&:hover': {
      backgroundColor: '#FFF',
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',

      '& img': {
        opacity: 1,
      },
    },

    '&:active': {
      backgroundColor: '#F2F2F2',
      boxShadow: 'inset 0px 1px 2px rgba(17, 0, 0, 0.35)',

      '& img': {
        opacity: 1,
      },
    },
  },
}));
