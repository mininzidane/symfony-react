import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  footer: {
    marginTop: 20,
  },
  body: {
    fontSize: '16px',
    lineHeight: '21px',
    color: '#4B5158',
  },
  cta: {
    display: 'inline-block',
    borderRadius: '9999px',
    width: 'auto',
    minWidth: '100px',
    marginRight: '12px',
    textTransform: 'none',
  },
  textBlack: {
    color: '#000',
  },
}));
