import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView }) => ({
  root: {
    padding: [[60, 26, 48]],
    backgroundColor: '#FFFFFF',

    [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
      padding: [[32, 24, 24]],
    },
  },
  checkmark: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
    height: 48,
  },
  title: {
    fontWeight: 'bold',
    fontSize: '26px',
    lineHeight: '32px',
    textAlign: 'center',
    color: '#333',
  },
  desc: {
    fontSize: '16px',
    lineHeight: '19px',
    textAlign: 'center',
    color: '#828282',
    margin: '12px auto 32px auto',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
  },
  cta: {
    minWidth: 280,
  },
  newOrderCta: {
    textAlign: 'center',
    marginTop: 12,
  },
}));
