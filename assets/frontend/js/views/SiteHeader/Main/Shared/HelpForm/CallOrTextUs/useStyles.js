import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    marginTop: 12,
  },
  button: {
    ...mixins.font(14, 20, 400),
    marginTop: 5,
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 99,
    color: '#FFF',
    padding: [[7, 12]],
    backgroundColor: '#28292B',
    border: '1px solid #BCBCBE',
    transition: 'all .15s ease',
    textAlign: 'center',
    textDecoration: 'none !important',
    textTransform: 'uppercase',

    '& img': {
      marginRight: 8,
      flexShrink: 0,
    },

    '&:hover': {
      backgroundColor: '#BCBCBE',
      color: '#1D1E20',
    },
  },
  title: {
    textAlign: 'center',
  },
  row: {
    ...mixins.font(14, 18, 400),
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[6, 0]],
    color: '#FFF',

    '&:not(:first-child)': {
      borderTop: '1px solid #4F5051',
    },

    '&:last-child': {
      paddingBottom: 0,
    },
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& div:first-child': {
      width: 23,
      display: 'flex',
      alignItems: 'center',
    },
  },
  contacts: {
    marginTop: 8,
  },
  key: {
    whiteSpace: 'nowrap',
  },
  value: {
    paddingLeft: 20,
    textAlign: 'right',

    '& a': {
      color: '#FFF !important',
    },
  },
}));
