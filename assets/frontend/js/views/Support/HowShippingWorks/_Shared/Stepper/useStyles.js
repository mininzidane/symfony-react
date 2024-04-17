import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingTop: 34,
    paddingBottom: 72,
  },
  title: {
    margin: 0,
    ...mixins.font(34, 44, 300),
    opacity: 0.8,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
    },
  },
  board: {
    padding: [[75, 95]],
    marginTop: 34,
    backgroundColor: '#F9F9FC',
    boxShadow: '0 2px 2px rgb(0 0 0 / 16%)',

    [breakpoints.down('sm')]: {
      padding: [[45, 30]],
      paddingBottom: 0,
    },
  },
}));
