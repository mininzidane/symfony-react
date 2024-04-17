import { makeStyles } from '@material-ui/core/styles';

const MIN_WIDTH = 570;
const GROWTH_START_WIDTH = 1600;
const GROWTH_RATIO = 1.5;

export default makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 570,
    position: 'relative',
    margin: [[0, 30]],
    flexGrow: 2,
    width: '100%',
    borderRadius: 4,
    zIndex: 0,
    boxShadow: '0px 1px 2px transparent',
    transition: 'box-shadow .2s ease',

    [breakpoints.up(GROWTH_START_WIDTH)]: {
      maxWidth: `calc(${MIN_WIDTH}px + (100vw - ${GROWTH_START_WIDTH}px) / ${GROWTH_RATIO})`,
    },

    [breakpoints.down('sm')]: {
      margin: 0,
      maxWidth: '100% !important',
    },

    '& input::-webkit-search-cancel-button': {
      display: 'none',
    },

    '&::after': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% + 2px)',
      height: 'calc(100% + 2px)',
      pointerEvents: 'none',
      border: '2px solid #1D92FD',
      top: -1,
      left: -1,
      borderRadius: 40,
      zIndex: 300,
      opacity: 0,
      transition: 'opacity .15s ease',
    },

    '&.is-focused': {
      zIndex: 50003,

      '& $input': {
        borderRadius: 6,

        '&:not(.is-empty)': {
          paddingRight: 100,
        },
      },

      '& $button': {
        borderRadius: [[0, 6, 6, 0]],
      },
    },

    [breakpoints.up('md')]: {
      '&:not(.is-focused):hover': {
        '& $input': {
          boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.2)',
        },

        '&::after': {
          opacity: 1,
        },
      },
    },
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    zIndex: '20',
    display: 'block',
    position: 'relative',
    padding: '0 54px 0 14px',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 54,
    paddingLeft: 74,
    fontSize: '16px',
    borderRadius: 30,
    color: '#4c4c4c',
    transition: 'box-shadow .15s ease, border-radius .15s ease ',
    appearance: 'none',

    '&.is-empty': {
      textOverflow: 'ellipsis',
    },

    '&::placeholder': {
      color: '#828282',
    },

    [breakpoints.down('sm')]: {
      height: 36,
      padding: [[0, 52, 0, 10]],
    },
  },
  button: {
    width: 48,
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 300,
    overflow: 'hidden',
    backgroundColor: '#FDB81D',
    border: '2px solid white',
    borderRadius: [[0, 30, 30, 0]],
    transition: 'all 0.2s ease',

    '&:hover': {
      backgroundColor: '#FED883',
    },

    '&:active': {
      backgroundColor: '#F2A702',
    },

    [breakpoints.down('sm')]: {
      width: 52,
    },

    '& svg': {
      position: 'absolute',
      width: 18,
      height: 18,
      margin: '-9px 0 0 -10px',
      top: '50%',
      left: '50%',
    },
  },
  searchDropdownOverlay: {
    position: 'fixed',
    top: 60,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: 'calc(100vh - 60px)',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity .15s ease',

    [breakpoints.down('sm')]: {
      height: 'calc(100vh + 40px)',
      top: 0,
      left: 0,
    },

    '&.is-shown': {
      visibility: 'visible',
      opacity: 1,
    },
  },
}));
