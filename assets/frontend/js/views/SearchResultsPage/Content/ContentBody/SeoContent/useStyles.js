import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    marginTop: 30,
    padding: [[22, 20, 28]],

    [breakpoints.down('sm')]: {
      paddingLeft: 14,
      paddingRight: 14,
    },

    '& h2': {
      ...mixins.font(28, 38, 400),
      color: '#333',
      margin: [[0, 0, 10]],

      [breakpoints.down('sm')]: {
        ...mixins.font(20, 28),
      },
    },

    '& p': {
      ...mixins.font(16, 24, 400),
      color: '#333',
      margin: [[0, 0, 25]],

      [breakpoints.down('sm')]: {
        ...mixins.font(14, 22),
        marginBottom: 20,
      },

      '&:last-child': {
        marginBottom: 0,
      },

      '& strong': {
        fontWeight: '400 !important',
      },
    },
  },
}));
