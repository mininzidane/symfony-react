import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'absolute',
    top: 107,
    right: 15,
    display: 'grid',
    gridTemplateColumns: '108px 275px',
    gridGap: 12,
    padding: 10,
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
      maxWidth: 'calc(100vw - 12px)',
      backgroundColor: 'rgba(58, 58, 58, 0.95)',
      zIndex: 4002,
    },

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '52px auto',
      alignItems: 'center',
      transform: 'translate(0, calc(-100% - 10px))',
      width: 'calc(100vw - 12px)',
    },
  },
  title: {
    display: 'block',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 700,
    color: '#FFFFFF !important',
    paddingRight: 20,
    textDecoration: 'none !important',
  },
  ctaContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto fit-content(0)',
    gridGap: 10,
    marginTop: 10,
    paddingRight: 10,

    '&.has-single-cta': {
      gridTemplateColumns: '1fr',
      paddingRight: 2,
    },

    [breakpoints.down('xs')]: {
      maxWidth: '100%',
      gridTemplateColumns: 'auto',
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

    [breakpoints.down('xs')]: {
      marginTop: 5,
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
  mobileCtaContainer: {
    gridColumn: '1 / 2 span',
    textAlign: 'center',
  },
}));
