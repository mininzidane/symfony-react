import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    minHeight: '134px',
  },
  body: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '25px 20px',
  },
  icon: {
    maxWidth: '86px',
    '& img': {
      width: '100%',
    },
  },
  info: {
    paddingLeft: '22px',
    flexShrink: '0',
  },
  cardNumber: {
    marginTop: '2px',
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '21px',
  },
  exp: {
    marginTop: '7px',
    fontSize: '12px',
    lineHeight: '17px',
    color: '#4B5158',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTop: '1px solid #EAEAEB',
    padding: '6px 7px',
  },
  preferred: {
    fontSize: '12px',
    lineHeight: '17px',
    marginLeft: '15px',
    marginRight: 'auto',
  },
  ctaMakePrimary: {
    color: '#000!important',
    marginRight: 'auto',
  },
}));
