import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    '& p': {
      ...mixins.font(14, 23, 300),
      margin: '0 0 18px',

      '&.last-update': {
        fontSize: 18,
        fontWeight: 300,
        marginTop: 0,
        marginBottom: 14,
      },
    },
    '& h2': {
      ...mixins.font(24, 24, 300),
      margin: '30px 0 18px',

      [breakpoints.down('sm')]: {
        ...mixins.font(18, 22),
        marginBottom: 12,
      },
    },
    '& h3': {
      ...mixins.font(16, 18, 700),
      margin: '16px 0 16px',
    },
    '& ol, & ul': {
      paddingLeft: 17,
      marginBottom: 22,
      fontWeight: 300,
      lineHeight: '23px',

      '& li': {
        marginBottom: 10,
      },
    },

    '& address': {
      fontSize: 14,
      fontWeight: 'lighter',
      lineHeight: '24px',
      textAlign: 'left',
    },
  },
  lastUpdate: {
    ...mixins.font(18, 20, 300),
    marginTop: '0',
    marginBottom: '14px',
  },
}));
