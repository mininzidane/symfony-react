import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 700,
    color: '#FFFFFF !important',

    [breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
  icon: {
    marginTop: 1,
    marginRight: 6,

    '@media(max-width: 390px)': {
      display: 'none',
    },
  },
}));
