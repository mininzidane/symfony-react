import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#000',
  },
  containerFullScreen: {
    padding: [[70, 0, 90]],

    [breakpoints.down('sm')]: {
      backgroundSize: 'contain',
      padding: [[55, 0, 60]],
    },
  },
  container: {
    maxWidth: 800,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    lineHeight: '38px',
    fontWeight: 400,
    margin: 0,
    color: '#FFF',
    textAlign: 'center',

    [breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  buttonWrap: {
    textAlign: 'center',
  },
}));
