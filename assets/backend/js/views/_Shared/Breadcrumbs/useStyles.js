import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[0, 20]],
  },
  nav: {
    padding: [[14, 0]],
    [breakpoints.down('sm')]: {
      padding: [[13, 0]],
    },
  },
  list: {
    background: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  listItem: {
    '& a, & span': {
      fontSize: '13px',
    },

    '& > a > span': {
      color: '#5b5d5f',
    },

    '& > span': {
      color: '#676a6c',
    },
  },
}));
