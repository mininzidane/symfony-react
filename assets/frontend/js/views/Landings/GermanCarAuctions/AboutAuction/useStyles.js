import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    paddingBottom: 40,

    [breakpoints.down('sm')]: {
      paddingBottom: 35,
    },
  },
  grid: {
    ...mixins.font(16, 20, 400),
    columnCount: 2,
    columnGap: 80,

    [breakpoints.down('lg')]: {
      columnGap: 40,
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 19),
      columnCount: 1,
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[30, 0]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[24, 0, 20]],
    },
  },
}));
