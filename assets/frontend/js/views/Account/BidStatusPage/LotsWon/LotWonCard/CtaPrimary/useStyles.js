import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    height: '50%',
    padding: '25px 25px 17px',
    borderBottom: '1px solid rgba(183, 181, 179, 0.5)',

    [breakpoints.down('md')]: {
      height: '100%',
    },

    [breakpoints.down('sm')]: {
      padding: '18px 15px !important',
    },
  },
  wrap: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  card: {
    paddingLeft: 20,
    width: 'calc(100% / 2.4)',

    [breakpoints.down('sm')]: {
      width: '100%',
      padding: '14px 0 0 0',
    },
  },
  textBlack: {
    color: '#000',
  },
  dropdownMessageText: {
    color: '#4B5158',
    fontSize: 16,
    lineHeight: '21px',
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
