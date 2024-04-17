import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: 'white',
    padding: [[50, 0, 120, 0]],

    [breakpoints.down('sm')]: {
      padding: [[30, 0, 40, 0]],
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 29,
    lineHeight: '39px',
    textAlign: 'center',
    fontWeight: 700,
    marginBottom: 70,

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
      marginBottom: 40,
    },
  },
  img: {
    width: '100%',
  },
  steps: {
    flexShrink: 0,
    marginRight: 70,

    [breakpoints.down('md')]: {
      marginRight: 0,
      marginBottom: 50,
    },
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 700,
    marginBottom: 40,

    '&:last-child': {
      marginBottom: 0,
    },

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
    },
  },
  stepIcon: {
    width: 88,
    height: 88,
    marginRight: 20,

    [breakpoints.down('sm')]: {
      width: 60,
      height: 60,
      marginBottom: 15,
      marginRight: 0,
    },
  },
  stepLabel: {
    fontSize: 20,
    lineHeight: '29px',
    color: '#387CCF',
    marginBottom: 10,
  },
  stepValue: {
    fontSize: 16,
    lineHeight: '21px',
  },
}));
