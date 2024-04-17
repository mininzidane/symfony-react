import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    paddingTop: 21,
    paddingBottom: 50,

    [breakpoints.down('sm')]: {
      padding: [[21, 14, 40]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 7fr) minmax(0, 3fr)',
    alignItems: 'start',
    gridGap: 28,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
    },

    [breakpoints.down('sm')]: {
      gridGap: 20,
    },
  },
  leftSide: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr)',
    gridGap: 24,

    [breakpoints.down('sm')]: {
      gridGap: 16,
    },
  },
  ad: {
    marginTop: -14,
    marginBottom: -14,

    [breakpoints.down('sm')]: {
      marginTop: -6,
      marginBottom: -6,
    },
  },
  bannerWrap: {
    margin: [[42, 'auto', 0]],
    width: '100%',
    maxWidth: 386,
  },
}));
