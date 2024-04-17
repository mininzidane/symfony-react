import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',

    [breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  content: {
    padding: [[0, 20]],
    marginTop: 20,

    [breakpoints.down('sm')]: {
      padding: [[0, 14]],
    },
  },
}));
