import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'center',
    alignItems: 'center',
    gridGap: 8,
    padding: [[35, 20]],

    '& img': {
      width: 20,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      justifyItems: 'center',
      textAlign: 'center',
      padding: [[16, 14]],

      '& img': {
        width: 24,
      },
    },
  },
  message: {
    ...mixins.font(16, 20),

    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
}));
