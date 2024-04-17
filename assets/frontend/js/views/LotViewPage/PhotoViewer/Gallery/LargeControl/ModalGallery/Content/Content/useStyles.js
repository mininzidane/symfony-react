import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    backgroundColor: '#1A1A1A',
    gridGap: 20,

    [breakpoints.down('sm')]: {
      gridGap: 6,
    },

    '&.is-full': {
      gridTemplateColumns: '1fr 1fr',
    },

    '&.is-compact': {
      gridTemplateColumns: '1fr',
    },
  },
}));
