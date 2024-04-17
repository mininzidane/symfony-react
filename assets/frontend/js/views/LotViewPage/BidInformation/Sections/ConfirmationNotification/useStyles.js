import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    position: 'relative',
    padding: [[8, 14]],
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: '#FFE09C',
    zIndex: 2,

    '&:first-child': {
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },

    '&:last-child': {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
      marginBottom: 14,
    },

    '&.is-highlighted': {
      backgroundColor: '#FFF1D3',
    },
  },
  amountRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333333',

    '& + &': {
      marginTop: 4,
      paddingTop: 4,
      borderTop: '1px solid #E0C589',
    },
  },
  tickbox: {
    '& label': {
      fontSize: 14,
      lineHeight: '18px',
      paddingLeft: 26,
    },
  },
}));
