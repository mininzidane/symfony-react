import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(28, 32, 400),
    display: 'flex',
    justifyContent: 'center',
    padding: [[20, 0]],

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
      padding: [[14, 0]],
    },

    '& img': {
      marginLeft: 14,
      position: 'relative',
      top: 2,

      '&.moneygram': {
        height: 20,
        top: 8,
      },

      [breakpoints.down('sm')]: {
        height: 18,
        marginLeft: 8,
        top: '1px !important',
      },
    },
  },
}));
