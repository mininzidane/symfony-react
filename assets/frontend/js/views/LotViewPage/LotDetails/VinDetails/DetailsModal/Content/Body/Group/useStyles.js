import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  caption: {
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 700,
    marginTop: 27,
    padding: [[15, 20]],
    backgroundColor: '#E4E2E0',
  },
  entries: {
    marginTop: 20,
    columnGap: 80,
    columnCount: 3,

    [breakpoints.down('lg')]: {
      columnCount: 2,
    },

    [breakpoints.down('sm')]: {
      columnCount: 1,
    },
  },
  entry: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    marginBottom: 13,

    [breakpoints.down('sm')]: {
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));
