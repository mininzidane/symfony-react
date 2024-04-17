import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: '50% 0',
    height: '440px',
    maxWidth: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    [breakpoints.down('md')]: {
      height: 'auto',
      paddingBottom: '90px',
    },
    [breakpoints.down('sm')]: {
      paddingBottom: '80px',
    },
  },
  title: {
    ...mixins.font(58, 70, 300),
    color: '#fff',
    textAlign: 'center',
    margin: '45px 0 0',
    [breakpoints.down('lg')]: {
      ...mixins.font(50, 58),
      marginTop: 39,
    },
    [breakpoints.down('md')]: {
      ...mixins.font(34, 46),
      marginTop: 29,
    },
    [breakpoints.down('sm')]: {
      ...mixins.font(26, 36),
    },
  },
  subtitle: {
    ...mixins.font(34, 52, 300),
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    [breakpoints.down('md')]: {
      ...mixins.font(22, 32),
      marginTop: 5,
    },
    [breakpoints.down('sm')]: {
      ...mixins.font(18, 28),
      marginTop: 15,
    },
  },
  logo: {
    width: 284,
    display: 'block',
    margin: '100px auto auto',
    [breakpoints.down('md')]: {
      marginTop: 65,
    },
    [breakpoints.down('sm')]: {
      width: 200,
      marginTop: 60,
    },
  },
}));
