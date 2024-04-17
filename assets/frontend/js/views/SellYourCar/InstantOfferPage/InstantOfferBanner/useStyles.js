import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[46, 0, 48]],
    backgroundSize: '1240px auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center -24px',

    [breakpoints.down('sm')]: {
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    },
  },
  container: {
    maxWidth: 800,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 26,
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
