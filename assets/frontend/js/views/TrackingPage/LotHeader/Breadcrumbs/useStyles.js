import { makeStyles } from '@material-ui/core/styles';

const quoteSym = '\\005C';

export default makeStyles(() => ({
  nav: {
    paddingTop: 7,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  listItem: {
    display: 'inline-flex',

    '&:not(:last-child)::after': {
      content: `'${quoteSym}'`,
      display: 'inline-block',
      padding: [[0, 5]],
      color: '#B7B5B3',
    },

    '& a, & span': {
      display: 'block',
      fontSize: '14px',
      lineHeight: '20px',
      color: ({ isSelect }) => (isSelect ? '#B7D0F6' : '#2158F5'),
    },

    '& > a > span': {
      color: ({ isSelect }) => (isSelect ? '#B7D0F6' : '#2158F5'),
    },

    '& > span': {
      color: ({ isSelect }) => (isSelect ? '#B7D0F6' : '#000000'),
    },
  },
}));
