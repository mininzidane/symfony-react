import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  inputGroup: {
    position: 'relative',
    flex: 1,
  },
  currencyGroup: {
    height: '34px',
    border: '1px solid #e5e6e7',
    borderRadius: '1px',
    borderRight: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    padding: '6px 12px',
    textAlign: 'center',
  },
  input: {
    outline: 0,
    border: '1px solid #E5E6E7',
    width: '100%',
    height: '34px',
    fontSize: 13,
    lineHeight: '34px',
    fontWeight: '700',
    display: 'block',
    textAlign: 'center',

    '&:not(:disabled)': {
      backgroundColor: '#FFFFFF',
    },
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
