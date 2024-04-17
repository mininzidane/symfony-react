import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  container: {
    maxWidth: 1460,
    margin: [[0, 'auto']],
    padding: [[42, 30, 35]],

    [breakpoints.down('lg')]: {
      maxWidth: 940,
    },

    [breakpoints.down('md')]: {
      padding: [[0, 30, 30]],
    },

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 15]],
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingTop: 24,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  label: {
    ...mixins.font(32, 42, 400),
    width: '100%',
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      textAlign: 'center',
    },
  },
}));
