import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: 40,
    position: 'relative',
    marginTop: 8,

    '&:hover input': {
      borderColor: '#000000',
    },
  },
  input: {
    backgroundColor: '#ffffff',
    border: '1px solid #AEB0B5',
    borderRadius: 4,
    textAlign: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    fontSize: 14,
    fontWeight: 700,
    transition: 'box-shadow .2s ease',

    '&.is-focused': {
      borderColor: '#2158F5 !important',
    },
  },
  button: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 8,
    zIndex: 2,
    userSelect: 'none',

    '&::before': {
      content: "''",
      position: 'absolute',
      top: -7,
      right: -7,
      left: -7,
      bottom: -7,
    },

    '&.is-plus': {
      right: 10,
    },

    '&.is-minus': {
      left: 10,
    },

    '& svg': {
      width: '100%',
      height: '100%',
    },

    '& circle': {
      transition: 'fill .2s ease',
    },

    '&:hover circle': {
      fill: '#2158F5',
    },
  },
  car: {
    position: 'absolute',
    top: 14,
    right: '50%',
    marginRight: -26,
  },
}));
