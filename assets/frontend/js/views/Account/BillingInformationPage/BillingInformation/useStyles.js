import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridGap: 30,
    paddingTop: 21,
    paddingBottom: 50,
    alignItems: 'stretch',

    [breakpoints.down('lg')]: {
      gridGap: 20,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 20,
    },

    '&.is-form': {
      paddingTop: 29,
      [breakpoints.down('sm')]: {
        paddingTop: 25,
      },
    },
  },
}));
