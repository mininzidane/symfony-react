import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  container: {
    maxWidth: 1460,
    margin: [[0, 'auto']],
    padding: [[0, 30, 48]],

    [breakpoints.down('lg')]: {
      maxWidth: 940,
    },

    [breakpoints.down('md')]: {
      padding: [[0, 30, 50]],
    },

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 30]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[42, 0, 15]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[24, 0, 20]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '3fr 2fr',
    gridGap: 20,
    alignItems: 'stretch',

    '&.is-single': {
      display: 'flex',
      justifyContent: 'center',
    },

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
