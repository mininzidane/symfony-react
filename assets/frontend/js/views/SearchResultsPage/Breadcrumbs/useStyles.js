import { makeStyles } from '@material-ui/core/styles';

const quoteSym = '\\005C';

export default makeStyles(({ breakpoints }) => ({
  root: {
    minHeight: 20,
    marginTop: 15,

    [breakpoints.down('sm')]: {
      marginTop: 0,
      padding: [[0, 14]],
    },
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: '0',
    margin: '0',

    [breakpoints.down('sm')]: {
      borderBottom: '1px solid #DCDCE0',
      padding: [[8, 0, 6]],
    },
  },
  listItem: {
    display: 'inline-flex',
    alignItems: 'center',

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

      [breakpoints.down('sm')]: {
        fontSize: '11px',
        lineHeight: '14px',
      },
    },

    '& > a > span': {
      color: '#2158F5',
    },

    '& > span': {
      color: '#000000',
    },
  },
}));
