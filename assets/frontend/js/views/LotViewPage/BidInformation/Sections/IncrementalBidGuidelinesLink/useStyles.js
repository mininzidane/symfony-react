import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  cta: {
    ...mixins.font(12, 16),
  },
  body: {
    ...mixins.font(14, 20),
    paddingTop: '14px',
  },
  table: {
    marginLeft: -20,
    marginRight: -20,
    [breakpoints.down('sm')]: {
      marginLeft: -14,
      marginRight: -14,
    },
    '& th': {
      ...mixins.font(12, 19),
      padding: '14px 20px!important',
      width: '50%',
      [breakpoints.down('sm')]: {
        paddingLeft: '14px!important',
        paddingRight: '14px!important',
      },
    },
    '& td': {
      ...mixins.font(12, 19),
      padding: '8px 20px',
      color: '#333',
      [breakpoints.down('sm')]: {
        paddingLeft: '14px!important',
        paddingRight: '14px!important',
      },
    },
  },
}));
