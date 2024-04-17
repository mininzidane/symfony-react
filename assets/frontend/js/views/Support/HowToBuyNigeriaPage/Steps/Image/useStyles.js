import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  withSlideUpAnimation: {
    transform: 'translateY(15%)',
    opacity: '0',
    transition: 'opacity .5s cubic-bezier(.175,.885,.32,1.275), transform .5s cubic-bezier(.175,.885,.32,1.275)',
    [breakpoints.down('sm')]: {
      transform: 'translateX(15%)',
    },
    "&[data-reveal-on-scroll-react='true']": {
      transform: 'translateY(0)',
      opacity: '1',
      [breakpoints.down('sm')]: {
        transform: 'translateY(0) !important',
      },
    },
  },
}));
