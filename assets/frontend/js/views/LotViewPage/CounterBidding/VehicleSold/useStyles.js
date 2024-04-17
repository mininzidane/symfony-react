import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    background: '#FFEFAF',
    borderRadius: '0px 0px 3px 3px',
    padding: '14px',
    marginTop: 5,
  },
  title: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '20px',
    textAlign: 'center',
    color: '#4A9029',
    marginTop: 8,
    marginBottom: 8,
    // marginBottom: '22px', TODO
  },
  content: {
    background: '#FFF8DF',
    borderRadius: '6px',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '20px',
  },
}));
