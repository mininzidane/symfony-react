import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  switchRoot: {
    margin: -12,
  },
  switchBase: {
    color: '#DFDFDF',
    '&$checked:hover': {
      background: 'none',
    },
    '&$checked + $track': {
      opacity: 1,
    },
    '&:hover': {
      background: 'none',
    },
  },
  colorPrimary: {
    '&$checked': {
      color: '#2158F5',
      '&:hover': {
        background: 'none',
      },
    },
    '&$checked + $track': {
      backgroundColor: '#81ABCB',
    },
  },
  colorSecondary: {
    '&$checked': {
      color: '#319400',
      '&:hover': {
        background: 'none',
      },
    },
    '&$checked + $track': {
      backgroundColor: '#97C97E',
    },
  },
  checked: {},
  track: {
    backgroundColor: '#CECECE',
    opacity: 1,
  },
  label: {
    fontSize: 16,
    lineHeight: '20px',
    marginRight: 20,
  },
  thumb: {},
}));
