import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: '32px ​14px 14px!important',
  },
  content: {
    maxWidth: '100%',
  },
  wrapText: {
    maxWidth: '600px',
    textAlign: 'center',
    margin: '0 auto',
    marginTop: '45px',
    fontSize: '16px',
    lineHeight: '21px',
  },
  actions: {
    marginTop: 50,
    backgroundColor: '#E6ECFD',
    borderRadius: 6,
    padding: 14,
    display: 'flex',
    justifyContent: 'center',
    gap: '8px 18px',
    flexFlow: 'wrap-reverse',
  },
  btn: {
    minWidth: 180,
    [breakpoints.down('sm')]: {
      width: '100%!important',
    },
  },
}));
