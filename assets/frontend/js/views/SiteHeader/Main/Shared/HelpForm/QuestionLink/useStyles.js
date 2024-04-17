import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(14, 20, 400),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    color: '#FFF',
    padding: [[7, 12]],
    backgroundColor: '#28292B',
    border: '1px solid #BCBCBE',
    transition: 'all .15s ease',
    textAlign: 'center',
    textDecoration: 'none !important',

    [breakpoints.up('md')]: {
      whiteSpace: 'nowrap',
    },

    '& img': {
      marginRight: 8,
      flexShrink: 0,
    },

    '&:not(:first-child)': {
      marginTop: 8,
    },

    '&:hover': {
      backgroundColor: '#BCBCBE',
      color: '#1D1E20',
    },
  },
}));
