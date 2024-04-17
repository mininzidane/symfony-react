import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'relative',
    '&:hover': {
      '& $input': {
        boxShadow: 'inset 0 0 0 1px #5D5D5D',
      },
      '& $circle': {
        fill: '#7D7D7D',
      },
    },
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: '4px !important',
    width: '100%',
    height: '40px',
    fontSize: '20px',
    lineHeight: '40px',
    fontWeight: '700',
    boxShadow: 'inset 0 0 0 1px #aeb0b5',
    display: 'block',
    textAlign: 'center',
    transition: 'box-shadow 0.2s ease',

    '&.is-focused': {
      boxShadow: 'inset 0 0 0 2px #2158f5',
    },

    '&.is-error': {
      boxShadow: 'inset 0 0 0 2px #8c0c0c',
    },
  },
  circle: {
    fill: '#D1D1D1',
    transition: 'fill .2s ease',
  },
  control: {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    top: '8px',
    ...mixins.extraHitbox(),

    '&.is-focused': {
      '&:hover $circle': {
        fill: '#23A7FF',
      },
      '& $circle': {
        fill: '#2158F5',
      },
    },

    '&:hover $circle': {
      fill: '#444',
    },

    '&.is-minus': {
      left: '7px',
    },

    '&.is-plus': {
      right: '7px',
    },
  },
  separator: {
    borderBottom: '1px solid #CACFDE',
    marginTop: 14,
    marginBottom: -4,
  },
  minValueWarning: {
    color: '#B00000',
    paddingTop: 5,
    lineHeight: '22px',
    fontSize: 14,
    marginBottom: -8,
  },
}));
