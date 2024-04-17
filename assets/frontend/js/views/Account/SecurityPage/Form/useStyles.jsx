import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(90% - 28px)',
    paddingRight: 15,

    [breakpoints.down('sm')]: {
      width: '100%',
      padding: 0,
    },
  },
}));
