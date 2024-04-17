import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  title: {
    color: '#000000',
    margin: '35px auto 0',
    fontSize: 32,
    lineHeight: '40px',
    fontWeight: '400',
    textAlign: 'center',

    [breakpoints.down('md')]: {
      marginTop: 20,
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  steps: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '40px auto',
    backgroundSize: '100%',
    position: 'relative',
    padding: [[0, 100]],

    [breakpoints.down('md')]: {
      padding: 0,
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 15,
    },
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    color: '#FFF',
    backgroundColor: '#393939',
    width: 32,
    height: 32,
    borderRadius: '50%',
    fontSize: 18,
    lineHeight: '24px',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 120,
    height: 120,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F1F8',
    borderRadius: '50%',
    position: 'relative',
    marginBottom: 10,
  },
  details: {
    textAlign: 'center',

    '& strong': {
      fontSize: 18,
      lineHeight: '24px',
    },

    '& span': {
      fontSize: 14,
      lineHeight: '20px',
    },
  },
  cars: {
    display: 'flex',
    justifyContent: 'center',
  },
  arrow: {
    marginBottom: 45,

    [breakpoints.down('md')]: {
      margin: [[30, 0]],
      transform: 'rotate(90deg)',
    },
  },
}));
