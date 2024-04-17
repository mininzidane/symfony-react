import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: 'linear-gradient(90deg, #647482 50%, #C4CBCA 50%)',

    [breakpoints.down('md')]: {
      borderTop: '1px solid #E3E3E3',
      background: '#FFF',
    },
  },
  container: {
    minHeight: 480,
    padding: [[40, 0, 50]],
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    width: '50%',

    [breakpoints.down('md')]: {
      width: '100%',
      padding: [[30, 0, 35]],
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '38px',
    fontWeight: 400,
    margin: 0,
    color: '#FFF',

    [breakpoints.down('md')]: {
      color: '#000',
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  text: {
    fontSize: 18,
    lineHeight: 1.5,
    color: '#FFF',
    margin: [[25, 0, 0]],

    [breakpoints.down('md')]: {
      color: '#000',
      fontSize: 16,
    },
  },
  supportManImage: {
    display: 'block',
    width: '100%',
  },
}));
