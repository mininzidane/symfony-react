import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'absolute',
    bottom: '-7%',
    right: '-7%',
    width: '80%',
    maxWidth: '218px',
    [breakpoints.down('sm')]: {
      right: 'auto',
      bottom: 'auto',
      width: '100px',
      position: 'relative',
    },
  },
  content: {
    top: '0',
    left: '0',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '19px',
    [breakpoints.down('md')]: {
      fontSize: '1.4vw',
      lineHeight: 'normal',
    },
    [breakpoints.down('sm')]: {
      fontSize: '8px',
      lineHeight: '9px',
    },
  },
  icon: {
    width: '32%',
    marginBottom: '4px',
    marginTop: '-10px',
    [breakpoints.down('sm')]: {
      width: '46%',
      marginBottom: 0,
    },
  },
  title: {
    width: '60%',
    textAlign: 'center',
  },
  desc: {
    color: '#226900',
    display: 'flex',
    alignItems: 'center',
  },
  checkmark: {
    height: '12px',
    position: 'relative',
    bottom: '-1px',
    [breakpoints.down('md')]: {
      height: '1.22vw',
      bottom: '-2px',
    },
    [breakpoints.down('sm')]: {
      height: '6px',
      bottom: '-1px',
    },
  },
}));
