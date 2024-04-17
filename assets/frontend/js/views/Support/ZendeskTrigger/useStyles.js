import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    'body > div[style*="z-index: 123456777"]': {
      [breakpoints.down('sm')]: {
        zIndex: '999999 !important',
        bottom: '0 !important',
      },
      [breakpoints.up('md')]: {
        bottom: '16px !important',
      },
    },
  },
  label: {
    paddingLeft: 20,
    paddingRight: 20,

    '& img': {
      position: 'relative',
      left: -10,
      top: 4,
    },
  },
}));
