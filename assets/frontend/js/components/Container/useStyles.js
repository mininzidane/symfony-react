import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: [[0, 15]],

    [breakpoints.up('xl')]: {
      maxWidth: 1170,
    },

    [breakpoints.down('lg')]: {
      maxWidth: 1004,
    },

    [breakpoints.down('md')]: {
      maxWidth: 768,
      padding: [[0, 14]],
    },
  },
}));
