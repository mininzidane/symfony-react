import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    height: '50%',
    padding: '20px 25px 17px',

    [breakpoints.down('md')]: {
      height: '100%',
    },

    [breakpoints.down('sm')]: {
      padding: '18px 15px !important',
    },
  },
  wrap: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  ctaStatus: {
    width: '100%',
    marginTop: 'auto',
    fontSize: 14,
    textAlign: 'right',

    [breakpoints.down('sm')]: {
      paddingTop: 13,
      textAlign: 'left',
    },

    '&.is-red': {
      color: '#981B1E',
    },

    '&.is-gray': {
      color: '#4B5158',
    },
  },
}));
