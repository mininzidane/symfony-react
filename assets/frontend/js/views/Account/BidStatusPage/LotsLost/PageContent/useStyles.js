import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '75% 1fr',
    alignItems: 'start',
    gridGap: 45,

    '&.is-loading': {
      gridTemplateColumns: '1fr',
    },

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },

    [breakpoints.down('sm')]: {
      gridGap: 40,
    },
  },
}));
