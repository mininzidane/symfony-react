import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(11, 16, 400),
    display: 'flex',
    alignItems: 'center',
    padding: [[4, 30, 4, 12]],
    margin: [[0, 6, 6, 0]],
    minHeight: 24,
    color: '#fff',
    borderRadius: 999,
    transition: 'background-color .15s ease, color .15s ease, border-color .15s ease',
    position: 'relative',
    backgroundColor: '#2158F5',
    cursor: 'default',
    overflow: 'hidden',

    [breakpoints.up('lg')]: {
      fontSize: 14,
      minHeight: 30,
    },
  },
  cross: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 3,
    right: 3,
    width: '18px !important',
    height: '18px !important',
    backgroundColor: '#F5F5F5',
    borderRadius: '50%',
    boxShadow: '0px 1px 2px transparent',
    transition: 'box-shadow .15s ease, opacity .15s ease, background-color .15s ease',

    [breakpoints.up('lg')]: {
      top: 4,
      right: 4,
      width: '22px !important',
      height: '22px !important',
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
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',

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
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));
