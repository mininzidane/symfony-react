import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 360px',
    alignItems: 'start',
    gridGap: 30,
    marginTop: 30,
    paddingBottom: 50,

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'minmax(0, 1fr)',
      marginTop: 10,
    },

    [breakpoints.down('xs')]: {
      padding: [[0, 0, 40]],
    },
  },
  toolbar: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',

    [breakpoints.down('xs')]: {
      padding: [[0, 14]],
    },
  },
}));
