import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  container: {
    maxWidth: 1040,
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
      padding: [[24, 0, 30]],
    },
  },
  caption: {
    ...mixins.font(18, 24, 700),
    marginTop: 15,
    textAlign: 'center',
  },
  desc: {
    ...mixins.font(16, 22, 400),
    color: '#48484A',
    marginTop: 10,
    display: 'inline-block',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 20,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },

    [breakpoints.down('sm')]: {
      gridGap: 30,
    },
  },
  benefit: {
    textAlign: 'center',
  },
  icon: {
    minHeight: 50,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',

    [breakpoints.down('xs')]: {
      minHeight: 'auto',
    },
  },
}));
