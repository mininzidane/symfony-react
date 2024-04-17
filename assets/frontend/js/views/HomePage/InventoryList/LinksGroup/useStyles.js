import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    '&:not(:first-child)': {
      marginTop: 37,

      [breakpoints.down('sm')]: {
        marginTop: 22,
      },
    },
  },
  groupTitle: {
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 700,
    margin: 0,
  },
  linksGrid: {
    display: 'block',
    marginTop: 2,
    columnCount: 4,
    columnGap: 12,

    [breakpoints.down('lg')]: {
      columnCount: 3,
    },

    [breakpoints.down('xs')]: {
      columnCount: 2,
    },
  },
}));
