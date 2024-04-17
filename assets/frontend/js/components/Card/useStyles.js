import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    borderRadius: 4,
    background: '#FFFFFF',

    '&.is-elevation-1': {
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    },

    '&.is-elevation-2': {
      boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    },

    '&.is-elevation-3': {
      boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    },

    '&.is-highlighted': {
      backgroundColor: '#FCFAEC',
    },

    '&.has-title': {
      paddingTop: 28,

      [breakpoints.down('sm')]: {
        paddingTop: 16,
      },
    },

    '&.has-side-paddings': {
      paddingLeft: 40,
      paddingRight: 40,

      [breakpoints.down('sm')]: {
        paddingLeft: 14,
        paddingRight: 14,
      },
    },
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 50,
    padding: [[0, 32, 0, 27]],
    borderLeft: '5px solid #C4C4C4',
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    color: '#333333',
    margin: 0,

    [breakpoints.down('sm')]: {
      padding: [[0, 18, 0, 15]],
      borderLeftWidth: 3,
    },
  },
}));
