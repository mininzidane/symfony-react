import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    borderTop: '2px solid #E1E1E1',
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
    padding: [[30, 0, 20]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[24, 0, 20]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '480px 480px',
    justifyContent: 'center',
    gridGap: 20,
    alignItems: 'stretch',

    '&.has-one-item': {
      gridTemplateColumns: '480px',

      [breakpoints.down('lg')]: {
        gridTemplateColumns: '1fr',
      },
    },

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  },
  centered: {
    maxWidth: 480,
    margin: [[0, 'auto']],
  },
  form: {
    backgroundColor: '#FFF',
    padding: [[24, 14]],

    '&.is-single': {
      padding: 24,
      marginTop: 43,

      [breakpoints.down('sm')]: {
        marginTop: 34,
      },
    },
  },
}));
