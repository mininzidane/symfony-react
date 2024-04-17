import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridGap: 4,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      textAlign: 'right',
    },
  },
  button: {
    [breakpoints.down('sm')]: {
      margin: [[6, 0, 9]],
      minWidth: 'calc(50vw - 36px)',
    },
  },
}));
