import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  item: {
    width: '100%',
    backgroundColor: 'inherit',
    fontSize: 16,
    lineHeight: 1.5,
    marginBottom: 5,
  },
  itemPre: {
    width: 10,
    textAlign: 'center',
    display: 'inline-block',
  },
  title: {
    display: 'inline-grid',
    gridTemplateColumns: '10px 1fr',
    gridGap: 5,
    color: '#3145FF',
    position: 'relative',
    backgroundColor: 'inherit',
    cursor: 'pointer',
    paddingRight: 5,
    textAlign: 'left',
  },
  list: {
    margin: 0,
    padding: [[8, 0, 0, 8]],
    display: 'flex',
    flexDirection: 'column',
    breakInside: 'avoid',
    breakBefore: 'avoid',
  },
  listItem: {
    listStyle: 'none',
    paddingRight: 5,

    '&:not(:first-child)': {
      marginTop: 3,
    },
  },
  listItemTitle: {
    display: 'flex',
    color: '#2158F5',
    fontWeight: 700,
    lineHeight: '20px',
    textTransform: 'capitalize',
    textDecoration: 'none !important',

    '&:hover span': {
      textDecoration: 'underline',
    },

    '&:before': {
      content: '"•"',
      paddingRight: 6,
      paddingLeft: 5,
      display: 'inline-block',
    },
  },
  listItemDesc: {
    fontSize: 14,
    lineHeight: 1.7,
    marginLeft: 18,
  },
  button: {
    color: '#2158F5',
    position: 'relative',
    top: -4,
    fontSize: 12,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
