import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
    '& + $root': {
      marginTop: '36px',
      [breakpoints.down('sm')]: {
        marginTop: '42px',
      },
    },
  },
  wrapImg: {
    width: '100%',
    maxWidth: '570px',
    marginRight: '42px',
    [breakpoints.down('md')]: {
      marginRight: '32px',
    },
    [breakpoints.down('sm')]: {
      marginRight: 0,
      marginBottom: '20px',
      maxWidth: '400px',
    },
  },
  img: {
    overflow: 'hidden',
    background: 'transparent',
    borderRadius: 0,
  },
  wrap: {
    width: '92%',
    marginTop: 'auto',
    marginBottom: 'auto',
    minHeight: '214px',
    [breakpoints.down('lg')]: {
      minHeight: '180px',
    },
    [breakpoints.down('md')]: {
      minHeight: 'auto',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  icon: {
    width: '40px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    [breakpoints.down('sm')]: {
      width: '32px',
    },
    '& > img': {
      maxWidth: '27px',
      minWidth: '20px',
      minHeight: '15px',
    },
  },
  title: {
    ...mixins.font(18, 24, 700),
  },
  stepNumber: {
    color: '#BDBDBD',
  },
  description: {
    ...mixins.font(16, 24),
  },
}));
