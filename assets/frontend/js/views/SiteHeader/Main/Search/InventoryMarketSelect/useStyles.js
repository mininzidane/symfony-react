import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'absolute',
    backgroundColor: '#F0F0F0',
    height: '100%',
    borderRadius: [[40, 0, 0, 40]],
    zIndex: 300,
    transition: 'all .2s ease',

    '&:hover, &.is-active': {
      backgroundColor: '#e2e2e2',
    },

    '&.is-focused': {
      borderRadius: [[6, 0, 0, 6]],
    },
  },
  trigger: {
    padding: [[0, 14]],
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    height: '100%',
  },
  label: {
    ...mixins.font(14, 20),
    color: '#828282',
    marginRight: 4,
    textAlign: 'left',
    pointerEvents: 'none',
  },
  popupWrap: {
    position: 'absolute',
    top: 'calc(100% + 2px)',
    left: 0,
    minWidth: 240,
    padding: [[8, 0]],
    borderRadius: 6,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: '#FFF',

    [breakpoints.down('sm')]: {
      width: 'calc(100vw - 28px)',
    },
  },
  triangle: {
    width: 0,
    height: 0,
    position: 'relative',
    top: 2,
    borderStyle: 'solid',
    borderWidth: '4px 4px 0 4px',
    borderColor: '#033333 transparent transparent transparent',
    pointerEvents: 'none',

    '&.is-active': {
      transform: 'scaleY(-1)',
    },
  },
  typeSelectCta: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[8, 14]],
    width: '100%',
    backgroundColor: 'transparent',
    transition: 'background-color .2s ease',

    '& > span': {
      whiteSpace: 'nowrap',
    },

    '&:hover': {
      backgroundColor: '#E4E2E0',
    },
  },
}));
