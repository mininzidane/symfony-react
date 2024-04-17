import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginLeft: 7,
    position: 'relative',

    [breakpoints.down('xs')]: {
      marginLeft: 10,
    },

    '&:first-child': {
      marginLeft: 0,
    },

    '&::before': {
      content: "''",
      position: 'absolute',
      top: -5,
      left: -3,
      right: -3,
      bottom: -5,
    },

    '&:not(.is-active):hover path': {
      fill: '#aaaaaa',
    },
  },
}));
