import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  listItem: {
    padding: [[4, 14]],
    minHeight: 32,

    '&:hover': {
      backgroundColor: '#E4E2E0',
    },

    '&.Mui-selected': {
      backgroundColor: 'transparent',
      color: '#2158F5',
    },
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minWidth: 120,
    width: '100%',
    fontSize: 14,

    '& > img': {
      marginLeft: 15,
      width: 15,
      height: 11,
    },
  },
  triggerWrap: {
    cursor: 'pointer',

    '&:hover $trigger': {
      textDecoration: 'underline',
    },

    [breakpoints.down('sm')]: {
      display: 'inline-flex',
    },
  },
  triggerDesc: {
    marginRight: 5,
  },
  trigger: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  triggerLabel: {
    marginRight: 5,
  },
  triggerBtn: {
    [breakpoints.down('sm')]: {
      lineHeight: 0,
    },
  },
  arrow: {
    width: 7,
    height: 3,
    marginTop: 2,
    '& path': {
      fill: '#2158F5',
    },
  },
}));
