import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    borderTop: '1px solid #303133',
  },
  trigger: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [[12, 14]],
    fontSize: 16,
    lineHeight: '20px',
    color: '#FFFFFF',
    fontWeight: 700,
    outline: 'none',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
    },

    '&:hover': {
      color: '#FFFFFF',
    },
  },
  abmInventory: {
    borderTop: '1px solid #303133',

    '&:hover': {
      '& a': {
        color: '#FFF1D3',
      },

      '& span': {
        backgroundColor: '#FFF1D3',
      },
    },

    '&:active': {
      '& a': {
        color: '#E69F03',
      },

      '& span': {
        backgroundColor: '#E69F03',
      },
    },

    '& a': {
      padding: 14,
      width: '100%',
      color: '#FDB81D',
      fontWeight: 700,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      display: 'inline-flex',
      alignItems: 'center',
    },

    '& span': {
      color: '#000000',
      padding: [[1, 4]],
      fontSize: 10,
      lineHeight: '15px',
      marginLeft: 5,
      whiteSpace: 'nowrap',
      borderRadius: 20,
      textTransform: 'uppercase',
      backgroundColor: '#FDB81D',
    },
  },
}));
