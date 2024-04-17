import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    padding: [[36, 0, 36]],
    color: '#333333',
    [breakpoints.down('sm')]: {
      padding: [[24, 0, 32]],
    },
  },
  title: {
    textAlign: 'left',
    "[dir='rtl'] &": {
      textAlign: 'right',
    },
  },
  grid: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  content: {
    display: 'flex',
    maxWidth: '550px',
    marginRight: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    maxHeight: '358px',
    "[dir='rtl'] &": {
      marginLeft: 'auto',
      marginRight: 0,
    },
    [breakpoints.down('md')]: {
      maxHeight: '100%',
    },
    [breakpoints.down('sm')]: {
      paddingBottom: '24px',
    },
  },
  advantages: {
    paddingTop: '26px',
    margin: 0,
    [breakpoints.down('sm')]: {
      paddingTop: '16px',
    },
  },
  formWrap: {
    width: '50%',
    maxWidth: '408px',
    flexShrink: '0',
    marginLeft: '14px',
    [breakpoints.down('md')]: {
      flexShrink: '1',
      minWidth: '300px',
    },
    [breakpoints.down('sm')]: {
      maxWidth: '100%',
      width: '100%',
      marginLeft: 0,
    },
  },
  form: {
    backgroundColor: '#FCFAEC',
    padding: '14px',
  },
  login: {
    fontSize: '14px',
    lineHeight: '19px',
    marginTop: '12px',
    marginBottom: '8px',
    textAlign: 'center',
    color: '#000',
  },
}));
