import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#1D1E20',
  },
  grid: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: [[12, 0]],

    [breakpoints.only('md')]: {
      alignItems: 'center',
    },

    [breakpoints.down('sm')]: {
      '& > div': {
        flex: 1,
      },
    },
  },
  copyright: {
    color: '#999',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: '16px',
    margin: [[0, 25]],

    '& a': {
      color: 'currentColor',
      textDecoration: 'underline',

      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
}));
