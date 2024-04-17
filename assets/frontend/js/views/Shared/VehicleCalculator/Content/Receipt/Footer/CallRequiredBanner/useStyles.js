import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 0',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontSize: 18,
    lineHeight: '22px',
  },
  callUs: {
    width: '100%',
    paddingTop: 4,
    paddingBottom: 4,
  },
}));
