import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [[0, 30]],
    backgroundColor: '#1D1E20',
    transition: 'transform .25s ease',
    transform: 'scale3d(1, 1, 1)',
    transformOrigin: 'top',
    boxShadow: '0 2px 3px rgba(0, 0, 0, .25)',

    '&.is-collapsed': {
      transform: 'scale3d(1, 0, 1)',

      '& > div': {
        opacity: 0,
      },
    },

    '& > div': {
      transition: 'opacity .15s ease',
      opacity: 1,
    },

    [breakpoints.down('md')]: {
      padding: [[0, 14]],
    },

    [breakpoints.up('md')]: {
      height: 32,
    },
  },
}));
