import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  downloadArrow: {
    display: 'inline-block',
    padding: [[0, 0, 0, 10]],

    '& svg': {
      width: 9,
    },

    '&:hover path': {
      fill: '#0275C1',
    },
  },
  subtotalWrap: {
    whiteSpace: 'nowrap',

    [breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
}));
