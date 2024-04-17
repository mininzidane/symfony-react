import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridGap: 16,
    marginTop: 28,

    [breakpoints.down('sm')]: {
      marginTop: 12,
      gridGap: 14,
    },
  },
  cardContentWrap: {
    paddingTop: 14,
    paddingBottom: 30,

    [breakpoints.down('sm')]: {
      paddingBottom: 24,
    },
  },
}));
