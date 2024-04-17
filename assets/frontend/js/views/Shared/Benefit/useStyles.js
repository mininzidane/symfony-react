import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    minHeight: 150,
    backgroundColor: '#FFF',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    padding: [[18, 35, 24, 167]],

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 25]],
      height: 'auto',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 700,

    [breakpoints.down('sm')]: {
      marginTop: 15,
      padding: [[0, 15]],
    },
  },
  subtitle: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      padding: [[0, 15]],
      marginTop: 5,
    },
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 150,
    paddingRight: 16,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      position: 'static',
      width: '100%',
      height: 44,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 4,
    },
  },
  triangle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 34,
    height: '100%',
    zIndex: 2,

    '& path': {
      fill: '#FFF',
    },
  },
}));
