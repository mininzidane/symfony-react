import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 366,
    position: 'relative',
    [breakpoints.down('sm')]: {
      paddingTop: '56px',
    },
  },
  icon: {
    marginBottom: '14px',
    marginTop: '18px',
    [breakpoints.down('sm')]: {
      width: '32px',
      height: '32px',
      marginBottom: '8px',
    },
  },
  title: {
    ...mixins.font(28, 39, 700),
    color: '#333333',
    textAlign: 'center',
    paddingLeft: '24px',
    paddingRight: '24px',
    [breakpoints.down('sm')]: {
      ...mixins.font(20, 32),
      marginBottom: '6px',
    },
  },
  desc: {
    ...mixins.font(16, 24),
    fontWeight: '400',
    color: '#828282',
    textAlign: 'center',
    marginTop: '2px',
    maxWidth: '580px',
    paddingLeft: '24px',
    paddingRight: '24px',
    [breakpoints.down('sm')]: {
      ...mixins.font(14, 18),
    },
  },
}));
