import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 70,
    display: 'grid',
    gridTemplateColumns: '1fr 64px 1fr 64px 1fr 64px 1fr',

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 40px 1fr 40px 1fr 40px 1fr',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: 40,
      marginTop: 50,
      justifyItems: 'center',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      marginTop: 30,
      gridGap: 35,
    },
  },
  arrow: {
    marginTop: 42,
    width: 64,
  },
}));
