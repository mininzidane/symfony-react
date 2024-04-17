import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    padding: '40px 50px 50px',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: '0 2px 2px rgba(0, 0, 0, .26)',
    '& p': {
      ...mixins.font(16, 21),
      margin: '15px 0 0',
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
        ...mixins.font(16, 21),
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
  label: {
    ...mixins.font(16),
    background: '#AE0000',
    display: 'inline-block',
    padding: '1px 8px 2px',
    borderRadius: '2px',
    color: 'white',
  },
  caption: {
    ...mixins.font(24, 28, 700),
    marginTop: '20px',
    color: '#006A85',
    [breakpoints.down('md')]: {
      fontSize: '18px',
      lineHeight: '22px',
    },
    [breakpoints.down('sm')]: {
      marginTop: '14px',
    },
  },
}));
