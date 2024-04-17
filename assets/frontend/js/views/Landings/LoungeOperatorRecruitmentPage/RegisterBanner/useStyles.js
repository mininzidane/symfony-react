import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[35, 0]],
    display: 'grid',
    placeItems: 'center',
    backgroundSize: '1440px auto',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: 244,

    [breakpoints.down('sm')]: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: [[0, 0]],
    },
  },
  container: {
    maxWidth: 800,

    [breakpoints.down('md')]: {
      maxWidth: 500,
    },
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
      padding: [[0, 20]],
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  buttonWrap: {
    textAlign: 'center',

    [breakpoints.down('xs')]: {
      '& button': {
        width: '100% !important',
      },
    },
  },
}));
