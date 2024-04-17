import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: '110px 0 120px',
    [breakpoints.down('sm')]: {
      padding: '44px 0 50px',
    },
  },
  wrapper: {
    backgroundPosition: 'left top!important',
  },
  title: {
    margin: '0',
    color: '#FFF',
    ...mixins.font(34, 42, 700),
    [breakpoints.down('sm')]: {
      ...mixins.font(22, 28),
      maxWidth: '250px',
      margin: '0 auto',
    },
  },
  subtitle: {
    margin: '20px 0 0',
    color: '#FFF',
    ...mixins.font(20, 30, 400),
    [breakpoints.down('sm')]: {
      margin: '10px 0 0',
      ...mixins.font(16, 20),
      textAlign: 'center',
      '& br': {
        display: 'none',
      },
    },
  },
}));
