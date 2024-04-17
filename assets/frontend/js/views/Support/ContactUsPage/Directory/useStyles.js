import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    paddingTop: 48,
    paddingBottom: 55,

    [breakpoints.down('md')]: {
      paddingTop: 45,
      paddingBottom: 45,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 30,
    },
  },
  head: {
    ...mixins.font(14, 22, 700),
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    marginTop: 24,
    paddingBottom: 8,
    borderBottom: '2px solid #949FAE',
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    color: '#333333',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
}));
