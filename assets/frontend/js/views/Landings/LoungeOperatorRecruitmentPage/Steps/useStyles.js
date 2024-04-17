import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[36, 0, 45]],
    backgroundColor: '#FFFFFF',

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 10]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  steps: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    marginTop: 45,

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      marginTop: 10,
      paddingLeft: 7,
    },
  },
  step: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    borderBottom: '2px solid #0071BC',
    paddingBottom: 25,

    [breakpoints.down('sm')]: {
      borderBottom: 'none',
      borderLeft: '2px solid #0071BC',
      flexDirection: 'row',
      padding: 18,
      paddingRight: 0,

      '&:first-child': {
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -5,
          width: 10,
          top: '0',
          height: '50%',
          backgroundColor: '#FFF',
        },
      },

      '&:last-child': {
        '&::before': {
          content: '""',
          position: 'absolute',
          left: -5,
          width: 10,
          top: '50%',
          height: '50%',
          backgroundColor: '#FFF',
        },
      },
    },
  },
  stepDesc: {
    marginTop: 16,

    [breakpoints.down('sm')]: {
      marginTop: 0,
      paddingLeft: 10,
      textAlign: 'left',
    },
  },
  stepIndex: {
    ...mixins.font(14, 20, 700),
    color: '#A6A6A6',
  },
  stepTitle: {
    ...mixins.font(17, 23, 700),
    maxWidth: 180,
    color: '#333',

    [breakpoints.down('md')]: {
      padding: [[0, 15]],
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 18),
      padding: 0,
      maxWidth: 'auto',
    },
  },
  stepPin: {
    position: 'absolute',
    left: 'calc(50% - 7px)',
    bottom: -8,
    zIndex: 20,

    [breakpoints.down('sm')]: {
      bottom: 'calc(50% - 15px)',
      left: 0,
      transform: 'rotate(90deg)',
    },
  },
}));
