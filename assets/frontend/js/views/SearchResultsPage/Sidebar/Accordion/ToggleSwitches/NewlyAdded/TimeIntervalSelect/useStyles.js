import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'inline-block',
    position: 'relative',
    zIndex: 300,
  },
  trigger: {
    ...mixins.extraHitbox(5),
    color: '#2158F5',
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',
    textUnderlineOffset: '2px',
    position: 'relative',
    paddingRight: 10,

    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: '55%',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '3px 3px 0 3px',
      borderColor: '#2159f5 transparent transparent transparent',
    },

    '&.is-active': {
      textDecoration: 'none',

      '&::after': {
        transform: 'scaleY(-1)',
      },
    },

    '&.is-disabled': {
      color: '#C0C0C0',
      textDecoration: 'none !important',
      pointerEvents: 'none',

      '&::after': {
        borderColor: '#C0C0C0 transparent transparent transparent',
      },
    },
  },
  menu: {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    margin: [[0, -14]],
    padding: [[6, 0]],
    left: 0,
    background: '#FFF',
    minWidth: 'calc(100% + 28px)',
    borderRadius: 4,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity 225ms ease',

    '&.is-open': {
      opacity: 1,
      visibility: 'visible',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: -6,
      left: 0,
      width: '100%',
      height: 6,
    },

    '& > button': {
      ...mixins.font(14, 20, 400),
      display: 'block',
      width: '100%',
      height: 30,
      padding: [[5, 14]],
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'left',

      '&:hover': {
        backgroundColor: '#E4E2E0',
      },
    },
  },
}));
