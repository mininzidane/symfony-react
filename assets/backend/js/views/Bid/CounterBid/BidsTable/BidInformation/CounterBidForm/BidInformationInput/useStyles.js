import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'relative',
  },
  input: {
    outline: 0,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E6E7',
    width: '100%',
    height: '34px',
    fontSize: 13,
    lineHeight: '34px',
    fontWeight: '700',
    display: 'block',
    textAlign: 'center',
  },
  control: {
    all: 'unset',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    top: 10,
    ...mixins.extraHitbox(),

    '&.is-minus': {
      left: 8,
    },

    '&.is-plus': {
      right: 8,
    },
  },
}));
