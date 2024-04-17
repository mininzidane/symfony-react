import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingTop: 1,
    backgroundColor: '#FFF',
  },
  container: {
    maxWidth: 1460,
    margin: [[0, 'auto']],
    padding: [[0, 30, 50]],

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 35]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[42, 0, 35]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[24, 0]],
    },
  },

  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '32px',
    paddingBottom: '42px',

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: '16px',
      paddingBottom: '25px',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
