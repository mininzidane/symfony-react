import { makeStyles } from '@material-ui/core/styles';

const quoteSym = '\\005C';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[14, 0]],
    [breakpoints.down('sm')]: {
      padding: [[13, 0]],
    },
  },
  list: {
    display: 'block',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    textAlign: 'left',
  },
  listItem: {
    display: 'inline',

    '&:not(:last-child)::after': {
      content: `'${quoteSym}'`,
      display: 'inline-block',
      padding: [[0, 5]],
      color: '#B7B5B3',
    },

    '& a, & span': {
      fontSize: '14px',
      lineHeight: '20px',
    },

    '& > a > span': {
      color: '#2158F5',
    },

    '& > span': {
      color: '#4B5158',
    },
  },
}));
