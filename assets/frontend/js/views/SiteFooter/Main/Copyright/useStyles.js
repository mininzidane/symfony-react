import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#1D1E20',

    [breakpoints.down('sm')]: {
      paddingBottom: '78px',
    },

    '&.is-bottom-toolbar-hidden': {
      [breakpoints.down('sm')]: {
        paddingBottom: 0,
      },
    },
  },
  copyright: {
    color: '#999',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '16px',
    textAlign: 'center',
    padding: [[12, 30]],

    '& a': {
      color: 'currentColor',
      textDecoration: 'underline',

      '&:hover': {
        textDecoration: 'none',
      },
    },

    [breakpoints.down('sm')]: {
      padding: [[8, 0, 30, 0]],
    },
  },
}));
