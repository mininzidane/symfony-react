import { makeStyles } from '@material-ui/core/styles';

const TWO_COL_BREAKPOINT = 1365;

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: 130,
    fontSize: 16,
    lineHeight: '24px',

    [`@media(max-width: ${TWO_COL_BREAKPOINT}px)`]: {
      gridTemplateColumns: '1fr',
      gridGap: 30,
    },

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '22px',
    },
  },
  card: {
    fontSize: 16,
    lineHeight: '24px',

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '22px',
    },
  },
  lists: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 27%)',
    justifyContent: 'space-between',

    [`@media(max-width: ${TWO_COL_BREAKPOINT}px)`]: {
      gridTemplateColumns: 'repeat(3, 24%)',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(3, 27%)',
    },

    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  title: {
    fontSize: 16,
    lineHeight: '27px',
    fontWeight: 700,

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '22px',
      marginTop: 15,
    },
  },
  list: {
    marginTop: 15,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 5,

    '& > span': {
      fontSize: 14,
      color: '#BDBDBD',
    },
  },
}));
