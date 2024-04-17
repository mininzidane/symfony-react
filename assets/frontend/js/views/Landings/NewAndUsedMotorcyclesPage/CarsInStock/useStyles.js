import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  container: {
    maxWidth: 1460,
    margin: [[0, 'auto']],
    padding: [[10, 30, 30]],

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
    textAlign: 'center',
    width: '100%',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      textAlign: 'center',
    },
  },
  registerCta: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 5,

    [breakpoints.down('sm')]: {
      paddingTop: 5,
      paddingBottom: 20,
    },
  },
}));
