import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  icon: {
    marginTop: '10px',
    marginBottom: '20px',
    width: '100px',
    [breakpoints.down('md')]: {
      marginTop: '10px',
      marginBottom: '24px',
    },
  },
  title: {
    fontWeight: 'bold',
    [breakpoints.down('md')]: {
      marginBottom: '4px',
    },
  },
  subTitle: {
    marginBottom: '35px',
    [breakpoints.down('md')]: {
      marginBottom: '16px',
    },
  },
  cta: {
    color: '#2158F5',
    borderBottom: '1px dashed #2158F5',
    whiteSpace: 'nowrap',
    '&:hover': {
      borderBottomColor: 'transparent',
    },
  },
}));
