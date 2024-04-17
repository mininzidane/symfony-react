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
  },
  linksGrid: {
    display: 'block',
    columnCount: 4,
    columnGap: 15,

    [breakpoints.down('lg')]: {
      columnCount: 3,
    },

    [breakpoints.down('sm')]: {
      columnCount: 2,
    },
  },
}));
