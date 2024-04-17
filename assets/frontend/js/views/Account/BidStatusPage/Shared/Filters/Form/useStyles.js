import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  filterWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 116,

    [breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginBottom: 15,
      minWidth: '100%',
    },

    '&:not(:last-child)': {
      marginRight: 20,

      [breakpoints.down('md')]: {
        marginRight: 0,
      },
    },
  },
  lotVinInput: {
    height: 40,
    minWidth: 200,

    [breakpoints.down('md')]: {
      minWidth: '100%',
    },
  },
  select: {
    width: '100%',

    '& .select-plane__control': {
      cursor: 'pointer !important',
    },

    '& .select-plane__control:not(.select-plane__control--menu-is-open)': {
      background: '#F6F6F6',

      [breakpoints.down('md')]: {
        background: '#FFF',
      },
    },

    '& .select-plane__single-value': {
      maxWidth: 'calc(100% - 14px)',
      paddingRight: 30,
    },
  },
  submitBtn: {
    marginTop: 5,
  },
}));
