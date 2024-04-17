import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[36, 0, 54]],
    backgroundSize: 'cover',
    maxWidth: '100%',
    color: '#FFFFFF',
    [breakpoints.down('sm')]: {
      padding: [[22, 0, 30]],
    },
  },
  content: {
    maxWidth: '760px',
    margin: '0 auto',
    paddingTop: '12px',
    [breakpoints.down('sm')]: {
      paddingTop: '8px',
    },
    '& .form-hint-plane': {
      color: '#fff',
      position: 'absolute',
      [breakpoints.down('sm')]: {
        position: 'relative',
      },
    },
  },
  subtitle: {
    margin: [[12, 0, 15]],
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,
    textAlign: 'center',
    opacity: 0.7,
    color: '#ffffff',
    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '18px',
    },
  },
}));
