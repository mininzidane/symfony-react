import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[36, 0]],

    [breakpoints.down('sm')]: {
      padding: [[24, 0]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '500px 560px',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 20,
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  subtitle: {
    ...mixins.font(18, 24, 400),
    margin: [[15, 0, 0]],

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 22),
    },
  },
  slider: {
    paddingBottom: '56.75%',
    backgroundColor: '#e5e5ec',
    borderRadius: 6,
    overflow: 'hidden',
  },
}));
