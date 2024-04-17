import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    color: '#F1F1F8',
    textAlign: 'left',
    pointerEvents: 'none',

    '&:hover': {
      textDecoration: 'none',
    },

    '&.is-editable': {
      pointerEvents: 'all',
      '&:hover span': {
        textDecoration: 'underline',
      },
    },

    '&.is-disabled': {
      pointerEvents: 'none',
      color: '#828282',
    },

    '& img': {
      flexShrink: '0',
      marginRight: 8,
    },

    '&:hover $radioIcon': {
      backgroundColor: '#272727',
    },
  },
  radioIcon: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    border: '1px solid #FFFFFF',
    flexShrink: '0',
    marginRight: 10,

    '&.is-disabled': {
      borderColor: '#828282',
    },
  },
}));
