import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    color: '#FFFFFF !important',
    whiteSpace: 'nowrap',
    flexShrink: '0',
    [breakpoints.down('lg')]: {
      marginLeft: 'auto',
      marginRight: 40,
    },
    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  icon: {
    marginTop: 1,
    marginRight: 6,

    '@media(max-width: 390px)': {
      display: 'none',
    },
  },
  link: {
    color: '#FFFFFF !important',
    padding: '10px 0',
    fontWeight: 700,
  },
}));
