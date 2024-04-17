import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    textTransform: 'uppercase',
    color: '#F14B4B',
    textAlign: 'center',
    margin: [[8, 0, -8]],
    whiteSpace: 'nowrap',

    [breakpoints.down('xs')]: {
      whiteSpace: 'normal',
    },
  },
}));
