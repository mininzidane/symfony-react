import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '780px 1fr',
    gap: 40,
    marginLeft: -30,
    marginRight: -30,
    paddingRight: 30,

    '@media(max-width: 1500px)': {
      gridTemplateColumns: '500px 1fr',
    },

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      gap: 25,
      marginLeft: 0,
      marginRight: 0,
      paddingRight: 0,
    },
  },
  image: {
    width: '100%',

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
