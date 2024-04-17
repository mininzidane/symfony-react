import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: '#E5E5E5',
  },
  step: {
    backgroundColor: '#F0F0F7',
    '&.is-step-1': {
      '& h3': {
        fontSize: '34px',
        lineHeight: '40px',
        color: 'rgba(0, 0, 0, .8)',
        padding: '45px 0 25px',
        margin: '0',
        textAlign: 'center',
        [breakpoints.down('sm')]: {
          textAlign: 'center',
          fontSize: '20px',
          lineHeight: '27px',
          color: 'rgba(0, 0, 0, .8)',
          padding: '20px 0',
        },
      },
      '& $line': {
        top: '85px',
        [breakpoints.down('sm')]: {
          top: '22px',
        },
      },
      '& $half:first-child': {
        paddingTop: '50px',
        [breakpoints.down('sm')]: {
          padding: '0 0 0 45px !important',
        },
      },
      '& $half:last-child': {
        [breakpoints.down('sm')]: {
          padding: '34px 0 0 45px !important',
          '& img': {
            maxWidth: '375px !important',
            width: '375px',
          },
        },
      },
    },
    '&.is-step-2': {
      '& $line': {
        [breakpoints.down('sm')]: {
          top: '-4px',
        },
      },
      '& $pin': {
        top: '106px',
        [breakpoints.down('sm')]: {
          top: '72px',
        },
      },
      '& $half:first-child': {
        paddingTop: '72px',
        [breakpoints.down('sm')]: {
          padding: '0 0 0 45px !important',
          '& img': {
            maxWidth: '375px !important',
            width: '375px',
            marginTop: '34px',
          },
        },
      },
      '& $half:last-child': {
        paddingTop: '72px',
        [breakpoints.down('sm')]: {
          // WebkitBoxOrdinalGroup: '0',
          // MsFlexOrder: '-1',
          order: '-1',
          padding: '34px 0 0 45px !important',
          '& img': {
            maxWidth: '375px !important',
            width: '100%',
          },
        },
      },
      '& $half:last-child img': {
        '@media (max-width: 500px)': {
          maxWidth: '100% !important',
        },
      },
      '& $card': {
        marginTop: '72px',
        [breakpoints.down('sm')]: {
          marginTop: '12px',
        },
      },
    },
    '&.is-step-3': {
      '& $line': {
        height: '100% !important',
        [breakpoints.up('md')]: {
          height: '32% !important',
        },
        [breakpoints.down('sm')]: {
          top: '-4px',
          height: '30px',
        },
      },
      '& $pin': {
        top: '105px',
        [breakpoints.down('sm')]: {
          top: '72px',
        },
      },
      '& $half:first-child': {
        paddingTop: '72px',
        [breakpoints.down('sm')]: {
          padding: '0 0 0 45px !important',
        },
      },
      '& $card': {
        marginBottom: '60px',
        [breakpoints.down('sm')]: {
          marginTop: '45px',
        },
      },
    },
    '&:nth-child(even) $half:first-child': {
      paddingRight: '55px',
    },
    '&:nth-child(even) $half:last-child': {
      paddingLeft: '74px',
      '@media (min-width: 991px)': {
        paddingLeft: '45px',
      },
    },
    '&:nth-child(odd) $half:first-child': {
      paddingRight: '74px',
      '@media (min-width: 991px)': {
        paddingRight: '45px',
      },
    },
    '&:nth-child(odd) $half:last-child': {
      paddingLeft: '55px',
    },
  },
  line: {
    height: '100%',
    position: 'absolute',
    left: '0',
    width: '1px',
    backgroundImage: 'linear-gradient(to top, #D69595, #D69595 60%, transparent 50%, transparent 100%)',
    backgroundSize: '10px 12px',
    [breakpoints.down('sm')]: {
      left: '10px',
      '& $pin': {
        width: '24px',
        height: '24px',
        left: '-12px',
      },
      '& $pin:after': {
        top: '6px',
        left: '6px',
        width: '12px',
        height: '12px',
      },
    },
  },
  pin: {
    boxShadow: '0 1px 1px rgba(0, 0, 0, .06)',
    borderRadius: '50%',
    width: '34px',
    height: '34px',
    left: '-17px',
    position: 'relative',
    backgroundColor: '#F1F1F1',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '10px',
      left: '10px',
      borderRadius: ' 50%',
      width: '14px',
      height: '14px',
      backgroundColor: '#AE0000',
    },
  },
  half: {
    position: 'relative',
    width: '50%',
    '&:first-child': {
      paddingRight: '74px',
    },
    '&:last-child': {
      paddingLeft: '55px',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      position: 'static',
    },
  },
  slider: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sliderMobile: {
    display: 'none',
    [breakpoints.down('sm')]: {
      display: 'inline-block',
      marginBottom: '60px',
      marginTop: '25px',
    },
  },
  card: {
    position: 'relative',
    padding: '40px 50px 50px',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 2px rgba(0, 0, 0, .26)',
    '& p': {
      margin: '15px 0 0',
      fontSize: '16px',
      lineHeight: '21px',
    },
    '&.with-right-tri': {
      transform: 'translateX(-25%)',
      opacity: '0',
      transition:
        'opacity .5s .5s cubic-bezier(.175,.885,.32,1.275), transform .5s .5s cubic-bezier(.175,.885,.32,1.275)',
      [breakpoints.down('sm')]: {
        transform: 'translateX(15%) !important',
      },
      '&:after': {
        content: '""',
        transform: 'rotate(45deg)',
        top: '42px',
        right: '-10px',
        position: 'absolute',
        background: '#fff',
        width: '20px',
        height: '20px',
        boxShadow: '0 2px 2px rgba(0, 0, 0, .26)',
      },
      '&:before': {
        content: '""',
        top: '10px',
        right: '0',
        zIndex: '2',
        position: 'absolute',
        background: '#fff',
        width: '24px',
        height: '64px',
      },
      "&[data-reveal-on-scroll-react='true']": {
        transform: 'translateX(0)',
        opacity: '1',
        [breakpoints.down('sm')]: {
          transform: 'translateX(0) !important',
        },
      },
    },
    '&.with-left-tri': {
      transform: 'translateX(25%)',
      opacity: '0',
      transition:
        'opacity .5s .5s cubic-bezier(.175,.885,.32,1.275), transform .5s .5s cubic-bezier(.175,.885,.32,1.275)',
      [breakpoints.down('sm')]: {
        transform: 'translateX(15%) !important',
      },
      '&:after': {
        transform: 'rotate(45deg)',
        top: '42px',
        left: '-10px',
        position: 'absolute',
        background: '#fff',
        content: '""',
        width: '20px',
        height: '20px',
        boxShadow: '0 1px 1px rgba(0, 0, 0, .16)',
      },
      '&:before': {
        top: '10px',
        left: '0',
        zIndex: '2',
        position: 'absolute',
        background: '#fff',
        content: '""',
        width: '24px',
        height: '64px',
      },
      "&[data-reveal-on-scroll-react='true']": {
        transform: 'translateX(0)',
        opacity: '1',
        [breakpoints.down('sm')]: {
          transform: 'translateX(0) !important',
        },
      },
    },
    [breakpoints.down('md')]: {
      padding: '22px 28px',
      '& p': {
        fontSize: '14px',
        lineHeight: '19px',
      },
    },
    [breakpoints.down('sm')]: {
      padding: '22px 28px',
      '& p': {
        fontSize: '16px',
        lineHeight: '21px',
      },
      '&:after': {
        top: '24px !important',
        right: 'auto',
        left: '-10px',
        boxShadow: '0 1px 1px rgba(0, 0, 0, .1) !important',
      },
      '&:before': {
        right: 'auto',
        left: '0',
      },
    },
  },
  cardLabel: {
    background: '#AE0000',
    display: 'inline-block',
    padding: '1px 8px 2px',
    borderRadius: '2px',
    fontSize: '16px',
    color: 'white',
  },
  cardCaption: {
    marginTop: '20px',
    fontSize: '24px',
    fontWeight: '700',
    lineHeight: '28px',
    color: '#006A85',
    [breakpoints.down('md')]: {
      fontSize: '18px',
      lineHeight: '22px',
    },
    [breakpoints.down('sm')]: {
      marginTop: '14px',
    },
  },
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
