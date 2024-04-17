import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  wrap: {
    wordBreak: 'break-all',

    [breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
  vin: {
    whiteSpace: 'nowrap',

    [breakpoints.down('md')]: {
      whiteSpace: 'normal',
      wordBreak: 'break-all',
    },
  },
}));
