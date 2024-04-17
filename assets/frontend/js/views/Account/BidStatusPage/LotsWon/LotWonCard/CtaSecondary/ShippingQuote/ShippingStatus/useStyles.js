import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  cancelOrderCta: {
    display: 'inline-block',
    marginLeft: 6,
  },
  trackingWrapper: ({ hasTrackingCta }) => ({
    width: hasTrackingCta ? 'calc(100% / 1.71429)' : '100%',

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  }),
  trackingCtaWrapper: {
    width: 'calc(100% / 2.4)',
    paddingLeft: 20,

    [breakpoints.down('sm')]: {
      padding: '14px 0 0 0',
      width: '100%',
    },
  },
  trackingCta: {
    width: '100% !important',
  },
  textRed: {
    color: '#981B1E',
  },
  textGray: {
    color: '#4B5158',
  },
  textGreen: {
    color: '#4A9029',
  },
}));
