import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    paddingTop: 1,

    [breakpoints.down('sm')]: {
      paddingTop: 4,
      display: 'flex',
      flexDirection: 'column',
    },
  },
  headline: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      alignItems: 'flex-start',
    },
  },
  headlineWrap: {
    minWidth: 0,
    flex: 1,
  },
  headlineText: {
    position: 'relative',
    margin: 0,
    width: '100%',
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '28px',
    textTransform: 'uppercase',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    color: '#333333',
    padding: [[3, 0, 2]],

    [breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '30px',
      paddingRight: 10,
      paddingBottom: 0,
    },
  },
  copartSelect: {
    display: 'inline-flex',
    marginLeft: 10,
    alignItems: 'center',

    '& div': {
      marginRight: 10,
      backgroundColor: '#98C0F8',
      width: '1px',
      height: 20,
    },
  },
  divider: {
    '&.is-select': {
      background: 'linear-gradient(90deg, transparent, #98C0F8, transparent)',
      backgroundSize: '1px auto',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '50%',
    },
  },
  info: {
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    color: '#000000',

    '&.is-select': {
      '& *': {
        color: '#FFF !important',
      },

      '& .is-dashed span': {
        borderBottomColor: '#7DAEF3',

        '&:hover': {
          borderBottomColor: 'transparent',
        },
      },
    },

    [breakpoints.down('sm')]: {
      lineHeight: '18px',
      width: '100%',
      paddingLeft: 0,
    },
  },
  lotId: {
    whiteSpace: 'nowrap',
    display: 'flex',

    '& > span:first-child': {
      paddingRight: 5,
    },
  },
  offsite: {},
  sublot: {},
  watchlist: {
    position: 'absolute',
    top: 10,
    right: 12,
  },
  value: {
    color: '#333',
  },
}));
