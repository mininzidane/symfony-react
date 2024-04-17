import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    verticalAlign: 'top',

    '&.is-highlighted td': {
      backgroundColor: '#FCFAEC !important',
    },

    '&:nth-child(odd) td': {
      backgroundColor: '#FFFFFF',
    },

    '&:nth-child(even) td': {
      backgroundColor: '#F6F9FD',
    },

    '&:not(:first-child)': {
      borderTop: '1px solid #E0E0E0',
    },

    '&:hover > td': {
      '&::after': {
        opacity: 1,
      },
    },
  },
  head: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
  },
}));
