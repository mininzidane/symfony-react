import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    position: 'relative',
    zIndex: 30,
  },
  placeholder: {
    position: 'relative',

    '&::after': {
      content: '""',
      ...mixins.coverer(),
      zIndex: 99,
      background: '#FFFFFF',
      opacity: 0.9,
    },
  },
  barContainer: {
    display: 'grid',
    gridGap: 10,
    paddingTop: 16,
    paddingBottom: 16,

    '&:empty': {
      display: 'none',
    },

    [breakpoints.down('sm')]: {
      paddingLeft: '0 !important',
      paddingRight: '0 !important',
    },

    [breakpoints.down('xs')]: {
      paddingTop: 10,
      paddingBottom: 8,
    },
  },
  mainRow: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    paddingRight: 25,

    [breakpoints.down('sm')]: {
      paddingRight: 0,
    },
  },
  mainRowLoading: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    alignItems: 'center',
  },
  mobileTools: {
    ...mixins.flex('between'),
    ...mixins.font(14, 24, 400),
    borderTop: '1px solid #F1F1F8',
    minHeight: 39,
    paddingTop: 8,
    margin: [[0, 14]],
  },
  scrollWrap: {
    position: 'relative',
    minWidth: 0,

    '&::before, &::after': {
      position: 'absolute',
      top: -7,
      zIndex: 20,
      height: 54,
      width: 18,

      [breakpoints.down('sm')]: {
        height: 42,
        top: -6,
      },
    },

    '&::before': {
      left: 0,
      borderLeft: '2px solid #BDBDBD',
    },

    '&::after': {
      right: 0,
      borderRight: '2px solid #BDBDBD',
    },

    '&.has-overflow-right::after': {
      content: "''",
    },

    '&.has-overflow-left::before': {
      content: "''",
    },
  },
  scrollContainer: {
    display: 'grid',
    gridAutoFlow: 'column',
    justifyContent: 'start',
    alignItems: 'center',
    gridGap: 14,
    position: 'relative',

    [breakpoints.down('sm')]: {
      width: '100%',
      gridGap: 8,
      padding: [[0, 14]],
    },

    '&.indiana-scroll-container--dragging': {
      cursor: 'grabbing !important',

      '& *': {
        cursor: 'grabbing !important',
      },
    },
  },
  filtersLoading: {
    width: 128,
    height: '40px !important',
    borderRadius: '20px !important',

    [breakpoints.down('sm')]: {
      width: 105,
      height: '30px !important',
    },
  },
  chipLoading: {
    width: 160,
    height: '40px !important',
    borderRadius: '20px !important',

    [breakpoints.down('sm')]: {
      width: 125,
      height: '30px !important',
    },
  },
  sliderArrowRight: {
    ...mixins.extraHitbox(15),
    position: 'absolute',
    top: '50%',
    right: -25,
    opacity: 0.8,
    transform: 'translateY(-50%)',

    '& img': {
      display: 'block',
    },

    '&:hover': {
      opacity: 1,
    },
  },
  sliderArrowLeft: {
    ...mixins.extraHitbox(15),
    position: 'absolute',
    top: '50%',
    left: -20,
    opacity: 0.8,
    transform: 'scaleX(-1) translateY(-50%)',

    '& img': {
      display: 'block',
    },

    [breakpoints.down('md')]: {
      left: -12,
    },

    '&:hover': {
      opacity: 1,
    },
  },
  viewModeControlLoading: {
    width: 140,
    height: '36px !important',
    borderRadius: 4,

    [breakpoints.down('sm')]: {
      width: 30,
      marginRight: 14,
      height: '30px !important',
    },
  },
}));
