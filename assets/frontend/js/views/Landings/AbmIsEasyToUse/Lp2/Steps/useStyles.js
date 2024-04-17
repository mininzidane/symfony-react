import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    outline: 'none',
    overflow: 'hidden',
  },
  title: {
    fontSize: '32px',
    lineHeight: '43px',
    fontWeight: '300',
    margin: 0,
    padding: '50px 0',
    color: '#313135',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      padding: '35px 0 40px',
      fontSize: 24,
      lineHeight: '36px',
    },
  },
  cell: {
    width: '380px',
    maxWidth: '100%',
    textAlign: 'center',

    '& img': {
      position: 'relative',
      zIndex: '2',

      ':first-child': {
        marginBottom: '20px',
      },
    },

    [breakpoints.down('lg')]: {
      width: 320,
    },

    [breakpoints.down('md')]: {
      width: '100%',

      '&:first-child': {
        marginBottom: 5,
      },

      '&:not(:last-child)': {
        marginBottom: 50,
      },

      '&:nth-child(2)': {
        marginBottom: 56,
      },
    },
  },
  caption: {
    fontSize: '32px',
    lineHeight: '43px',
    marginTop: 20,

    [breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '36px',
    },
  },
  subcaption: {
    fontSize: '16px',
    lineHeight: '21px',
    margin: '20px 0 35px',
    color: '#95989A',

    [breakpoints.down('md')]: {
      margin: '10px 0 25px',
    },

    [breakpoints.down('sm')]: {
      margin: '6px 0 25px',
    },
  },
  stepsGrid: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  line: {
    content: '""',
    height: '3px',
    width: '794px',
    position: 'absolute',
    top: '50px',
    left: '50%',
    transform: 'translateX(-50%)',

    [breakpoints.down('lg')]: {
      width: 600,
    },

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  buttonWrap: {
    padding: [[70, 0, 60]],
    display: 'grid',
    placeItems: 'center',

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 50]],
    },
  },
}));
