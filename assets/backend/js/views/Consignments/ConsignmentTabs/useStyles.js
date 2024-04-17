import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #e7eaec',

    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  tab: {
    textTransform: 'capitalize',
    marginBottom: -1,
    cursor: 'pointer',
    display: 'block',
    fontWeight: 400,
    color: '#676a6c',
    padding: '14px 20px 14px 25px',
    borderRadius: '4px 4px 0 0',
    border: '1px solid transparent',
    marginRight: 2,

    '&.active': {
      background: '#fff',
      cursor: 'default',
      fontWeight: 700,
      color: '#5b5d5f',
      border: '1px solid #e7eaec',
      borderBottomColor: 'transparent',

      [breakpoints.down('sm')]: {
        borderBottom: '1px solid #e7eaec',
      },
    },
  },
}));
