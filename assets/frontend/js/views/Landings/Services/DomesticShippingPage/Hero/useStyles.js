import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundSize: 'cover',
    height: '420px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0',
    maxWidth: 'none',
    backgroundPosition: '0% 10%',
    [breakpoints.down('md')]: {
      height: '360px',
    },
    [breakpoints.down('sm')]: {
      height: '240px',
    },
  },
  title: {
    ...mixins.font(57, 66),
    color: '#fff',
    textAlign: 'center',
    [breakpoints.down('lg')]: {
      ...mixins.font(47, 58),
    },
    [breakpoints.down('md')]: {
      ...mixins.font(36, 45),
    },
    [breakpoints.down('sm')]: {
      ...mixins.font(22, 30),
    },
  },
}));
