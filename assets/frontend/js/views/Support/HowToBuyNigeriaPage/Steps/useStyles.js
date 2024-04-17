import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  image: {
    display: 'block',
    textAlign: 'center',
    lineHeight: '0',
    '&.is-right': {
      marginLeft: -20,
      [breakpoints.down('md')]: {
        marginLeft: 0,
      },
    },
    '&.is-left': {
      marginRight: -20,
      [breakpoints.down('md')]: {
        marginRight: 0,
      },
    },
    '&.is-step1': {
      marginTop: -50,
      [breakpoints.down('sm')]: {
        marginTop: 45,
      },
    },
    '&.is-step2-left': {
      marginBottom: 52,
    },
    '&.is-step2-right': {
      marginTop: 62,
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '&.is-step3': {
      marginTop: 45,
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '&.is-step5': {
      [breakpoints.down('sm')]: {
        maxWidth: 375,
        width: '100%',
        margin: '0 auto',
      },
    },
    '&.is-step10': {
      marginRight: -130,
      [breakpoints.down('md')]: {
        marginRight: -100,
        marginLeft: -140,
      },
      [breakpoints.down('sm')]: {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 440,
        width: '100%',
      },
    },
  },
  textPassport: {
    color: '#717171',
    marginTop: -20,
    display: 'flex',
    justifyContent: 'center',
    '& > img': {
      marginRight: 9,
      width: 20,
      height: 20,
    },
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
