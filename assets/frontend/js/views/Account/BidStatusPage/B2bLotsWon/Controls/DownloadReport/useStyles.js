import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('lg')]: {
      padding: '7px !important',
      width: '40px !important',
    },
    [breakpoints.down('md')]: {
      width: '30px !important',
    },
  },
  label: {
    [breakpoints.down('lg')]: {
      gridTemplateColumns: '16px',

      '& span': {
        display: 'none',
      },

      '& svg': {
        marginRight: 0,
      },
    },
  },
}));
