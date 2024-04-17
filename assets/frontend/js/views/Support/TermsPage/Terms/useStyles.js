import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    '& p': {
      ...mixins.font(14, 23, 300),
      margin: '0 0 18px',
    },
    '& h2': {
      ...mixins.font(24, 24, 300),
      margin: '30px 0 18px',
    },
    '& h3': {
      ...mixins.font(16, 18, 700),
      margin: '16px 0 16px',
    },
    '& ol': {
      paddingLeft: 17,
      marginBottom: 22,
      fontWeight: 300,
      '& li': {
        marginBottom: 10,
      },
    },
  },
  lastUpdate: {
    ...mixins.font(18, 20, 300),
    marginTop: '0',
    marginBottom: '14px',
  },
  contractingPartyTable: {
    margin: [[40, 0]],

    [breakpoints.down('sm')]: {
      margin: [[25, 0, 22]],

      '& > div': {
        boxShadow: 'none',
        border: '1px solid #e0e0e0',

        '&:nth-child(2)': {
          marginTop: 14,
        },

        '& > div > div:first-child': {
          minWidth: '42%',
        },
      },
    },
  },
}));
