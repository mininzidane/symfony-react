import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    height: 150,
    backgroundColor: '#FFF',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    padding: [[18, 15, 20, 162]],

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 25]],
      height: 'auto',
      textAlign: 'center',
    },
  },
  title: {
    fontSize: 17,
    lineHeight: '24px',
    fontWeight: 700,

    [breakpoints.down('sm')]: {
      marginTop: 15,
      padding: [[0, 15]],
    },
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: '20px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      padding: [[0, 15]],
      marginTop: 5,
    },
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',

    [breakpoints.down('sm')]: {
      position: 'static',
      objectFit: 'cover',
      width: '100%',
      height: 44,
      display: 'block',
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
  },
}));
