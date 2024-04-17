import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    textTransform: 'uppercase',
    fontWeight: 300,
    whiteSpace: 'nowrap',

    [breakpoints.down('lg')]: {
      whiteSpace: 'mormal',
    },

    [breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
}));
