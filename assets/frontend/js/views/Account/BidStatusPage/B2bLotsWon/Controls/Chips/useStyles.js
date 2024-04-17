import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
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
    },

    '&.indiana-scroll-container--dragging': {
      cursor: 'grabbing !important',

      '& *': {
        cursor: 'grabbing !important',
      },
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
}));
