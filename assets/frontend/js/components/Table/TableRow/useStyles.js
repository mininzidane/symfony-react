import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    verticalAlign: 'top',

    '&:not(:first-child)': {
      borderTop: '1px solid #d4d4d4',
    },
  },
  head: {
    border: 'none',
    borderBottom: '1px solid #4F4F4F',
  },
  hoverable: {
    '&:hover > td': {
      backgroundColor: '#f1f1f1',

      '&::after': {
        opacity: 1,
      },
    },
  },
}));
