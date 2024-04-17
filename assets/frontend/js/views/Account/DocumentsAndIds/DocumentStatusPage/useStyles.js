import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingTop: 28,
    paddingBottom: 50,
    minHeight: 400,

    [breakpoints.down('sm')]: {
      paddingTop: 18,
      paddingBottom: 40,
    },
  },
  title: {
    ...mixins.font(28, 34, 300),
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 26),
    },
  },
  text: {
    ...mixins.font(16, 20, 400),
    marginTop: 30,
    fontSize: 16,
  },
  buttons: {
    marginTop: 40,
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 10,

    [breakpoints.down('sm')]: {
      marginTop: 30,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      width: '100%',
    },
  },
}));
