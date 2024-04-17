import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[45, 0, 60]],
    backgroundColor: '#FFFFFF',

    [breakpoints.down('md')]: {
      padding: [[30, 0, 48]],
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '38px',
    fontWeight: 400,
    margin: 0,
    textAlign: 'center',

    [breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  grid: {
    marginTop: 40,
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 40,

    [breakpoints.down('md')]: {
      gridGap: 20,
      marginTop: 32,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  container: {
    maxWidth: 1040,
  },
}));
