import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#0E122F',
    position: 'relative',
  },
  container: {
    backgroundSize: 'cover',
    paddingLeft: 0,
    paddingRight: 0,

    [breakpoints.down('xs')]: {
      backgroundSize: 'contain',
      backgroundPosition: 'top',
      backgroundColor: '#262B3F',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gridGap: 30,
    marginTop: 40,
    paddingBottom: 40,
    position: 'relative',
    zIndex: 3,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column-reverse',
      flexWrap: 'wrap',
      gridGap: 0,
      paddingBottom: 0,
      marginTop: 25,
    },
  },
  title: {
    fontSize: 32,
    fontWeight: 400,
    lineHeight: '44px',
    color: '#FFF',
    margin: 0,
    paddingTop: 40,
    textAlign: 'center',
    position: 'relative',
    zIndex: 2,

    [breakpoints.down('lg')]: {
      fontSize: 24,
      lineHeight: '32px',
    },

    [breakpoints.down('sm')]: {
      paddingTop: 25,
      fontSize: 18,
      lineHeight: '24px',
      paddingLeft: 25,
      paddingRight: 25,
    },
  },
  description: {
    padding: '30px',
    color: 'white',
    height: '100%',
    borderRadius: '4px',
    background: 'rgba(66, 120, 184, 0.75)',
    fontSize: '32px',
    fontWeight: 300,

    [breakpoints.down('lg')]: {
      fontSize: 24,
      lineHeight: '32px',
    },

    [breakpoints.down('sm')]: {
      padding: 18,
      fontSize: 16,
      lineHeight: '22px',
      marginLeft: 15,
      marginRight: 15,
    },

    '& a': {
      color: 'white',
    },
  },
  features: {
    marginTop: 35,

    [breakpoints.down('lg')]: {
      marginTop: 25,
    },

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },

    '& div': {
      fontSize: '24px',
      lineHeight: '38px',
      fontWeight: 400,

      [breakpoints.down('lg')]: {
        marginBottom: 5,
        fontSize: 22,
        lineHeight: '28px',
      },

      [breakpoints.down('sm')]: {
        fontSize: 16,
        lineHeight: '22px',
      },
    },
  },
  phone: {
    paddingLeft: 22,
    fontSize: '24px',
    lineHeight: '38px',
    fontWeight: 400,

    [breakpoints.down('lg')]: {
      fontSize: 18,
      lineHeight: '24px',
    },

    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '22px',
      paddingLeft: 5,
    },
  },
  openHours: {
    paddingLeft: 25,
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: 400,

    [breakpoints.down('lg')]: {
      fontSize: 18,
      lineHeight: '24px',
    },

    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '22px',
      paddingLeft: 5,
    },
  },
  login: {
    textAlign: 'center',
    marginTop: 15,
  },
  card: {
    height: '100%',

    [breakpoints.down('lg')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },

    [breakpoints.down('sm')]: {
      margin: [[30, -14, 0]],
      paddingLeft: 14,
      paddingRight: 14,
      borderRadius: 0,
    },
  },
  flag: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 206,

    [breakpoints.down('sm')]: {
      top: 0,
      width: 100,
    },
  },
}));
