import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'absolute',
    top: 107,
    right: 15,
    display: 'grid',
    maxWidth: '365px',
    width: '100%',
    gridTemplateColumns: '60px 1fr',
    gridGap: 12,
    padding: '8px 12px 14px',
    backgroundColor: '#444444',
    borderRadius: 4,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    opacity: 0,
    pointerEvents: 'none',
    transform: 'translateX(calc(100% + 20px))',
    transition: 'transform .35s cubic-bezier(0.47, 0, 0.75, 0.72), opacity .25s ease-out, top .15s ease',
    zIndex: 4000,

    '&.is-revealed': {
      transition: 'transform .35s cubic-bezier(0.22, 0.61, 0.36, 1), opacity .25s ease-in, top .15s ease',
      transform: 'translateX(0)',
      opacity: 1,
      pointerEvents: 'all',
      [breakpoints.down('xs')]: {
        transform: 'translateY(0)',
      },
    },

    [breakpoints.down('sm')]: {
      top: 106, // 100px (header height) + 6px margin
      right: 6,
      backgroundColor: 'rgba(58, 58, 58, 0.95)',
      zIndex: 4002,
    },
    [breakpoints.down('xs')]: {
      paddingTop: 13,
      maxWidth: 'calc(100vw - 12px)',
      gridTemplateColumns: '42px 1fr',
      transform: 'translate(0, calc(-100% - 10px))',
    },
  },
  icon: {
    backgroundColor: '#1D1E20',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    margin: 'auto',
    gridRow: '1/3',
    '& img': {
      width: '34px',
      height: '27px',
    },
    [breakpoints.down('xs')]: {
      gridRow: '1',
      width: '42px',
      height: '42px',
      '& img': {
        width: '24px',
        height: '19px',
      },
    },
  },
  title: {
    ...mixins.font(14, 20, 700),
    color: '#fff',
    paddingRight: '10px',
  },
  ctaContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto fit-content(0)',
    gridGap: 10,
    marginTop: -5,
    [breakpoints.down('xs')]: {
      marginTop: 0,
      gridGap: '8px',
      gridColumn: '1/3',
      maxWidth: '100%',
      gridTemplateColumns: 'auto',
    },
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,

    '&::after': {
      top: -20,
      right: -20,
      bottom: -20,
      left: -20,
    },
  },
  dontShowCta: {
    fontSize: 12,
    lineHeight: '20px',
    color: '#F1F1F8',
    whiteSpace: 'nowrap',
    textDecoration: 'underline',

    '&:hover': {
      textDecoration: 'none',
    },
  },
}));
