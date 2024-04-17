import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
  },
  container: {
    maxWidth: 1460,
    margin: [[0, 'auto']],
    padding: [[0, 30, 50]],

    [breakpoints.down('lg')]: {
      maxWidth: 940,
    },

    [breakpoints.down('md')]: {
      padding: [[0, 30, 50]],
    },

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 40]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[42, 0]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[20, 0, 32]],
    },
  },
  grid: {
    display: 'grid',
    gridGap: '40px 60px',
    gridTemplateColumns: '1fr 1fr 1fr',
    justifyContent: 'space-between',

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '400px 400px',
      gridGap: '40px 0',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '30px',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: '20px',
    },
  },
}));
