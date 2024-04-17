import { makeStyles } from '@material-ui/core/styles';

const GRID_GAP_LARGE = 20;
const GRID_GAP_SMALL = 10;

export default makeStyles(({ breakpoints, mixins }) => ({
  root: () => ({
    paddingBottom: 48,

    [breakpoints.down('sm')]: {
      paddingBottom: 25,
    },

    "&[data-hidden-seo='true'] #seo-content": {
      display: 'none',
    },
  }),
  facebookBanner: {
    marginTop: GRID_GAP_LARGE,

    [breakpoints.down('sm')]: {
      marginTop: GRID_GAP_SMALL,
      marginBottom: GRID_GAP_SMALL,
    },
  },
  offsetTop: {
    marginTop: GRID_GAP_LARGE,

    [breakpoints.down('sm')]: {
      marginTop: GRID_GAP_SMALL,
    },
  },
  contentContainer: {
    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },
  bodyLoader: {
    position: 'relative',

    '&::after': {
      content: '""',
      ...mixins.coverer(),
      zIndex: 4001,
      background: '#F1F1F8',
      opacity: 0.95,
    },
  },
  headerLoader: {
    position: 'relative',

    '&::after': {
      content: '""',
      ...mixins.coverer(),
      zIndex: 4001,
      background: '#FFFFFF',
      opacity: 0.9,
    },
  },
  placeholder: {
    visibility: 'hidden',
  },
}));
