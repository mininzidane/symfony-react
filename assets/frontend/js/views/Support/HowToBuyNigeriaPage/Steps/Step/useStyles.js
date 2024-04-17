import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    overflow: 'hidden',
    '&:nth-child(even)': {
      backgroundColor: '#ECECEC',
      '& $half:last-child': {
        [breakpoints.down('sm')]: {
          order: '-1',
        },
      },
    },
  },
  title: {
    ...mixins.font(34, 40),
    color: 'rgba(0, 0, 0, .8)',
    padding: '45px 0 25px',
    margin: '0',
    textAlign: 'left',
    [breakpoints.down('sm')]: {
      ...mixins.font(20, 27),
      textAlign: 'center',
      color: 'rgba(0, 0, 0, .8)',
      padding: '20px 0',
    },
  },
  line: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 1,
    backgroundImage: 'linear-gradient(to top, #D69595, #D69595 60%, transparent 50%, transparent 100%)',
    backgroundSize: '10px 12px',
    '&.is-first': {
      top: 100,
      height: 'calc(100% - 100px)',
      [breakpoints.down('sm')]: {
        top: 37,
        height: 'calc(100% - 37px)',
      },
      '& $pin': {
        top: -15,
      },
    },
    '&.is-last': {
      height: 115,
      [breakpoints.down('sm')]: {
        height: 75,
      },
    },
    [breakpoints.down('sm')]: {
      left: 10,
      '& $pin': {
        width: 24,
        height: 24,
        left: -12,
      },
      '& $pin:after': {
        top: 6,
        left: 6,
        width: 12,
        height: 12,
      },
    },
  },
  pin: {
    boxShadow: '0 1px 1px rgba(0, 0, 0, .06)',
    borderRadius: '50%',
    width: 34,
    height: 34,
    left: -17,
    top: 105,
    position: 'relative',
    backgroundColor: '#F1F1F1',
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 10,
      left: 10,
      borderRadius: ' 50%',
      width: 14,
      height: 14,
      backgroundColor: '#AE0000',
    },
    [breakpoints.down('sm')]: {
      top: 66,
    },
  },
  half: {
    position: 'relative',
    width: '50%',
    paddingTop: 72,
    '&.is-first': {
      paddingTop: 50,
      [breakpoints.down('sm')]: {
        padding: '0 0 0 45px',
      },
    },
    '&:first-child': {
      paddingRight: 74,
      [breakpoints.down('md')]: {
        paddingRight: 45,
      },
      [breakpoints.down('sm')]: {
        padding: '45px 0 0 45px',
      },
    },
    '&:last-child': {
      paddingLeft: 74,
      [breakpoints.down('md')]: {
        paddingLeft: 45,
      },
      [breakpoints.down('sm')]: {
        padding: '45px 0 0 45px',
      },
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      position: 'static',
    },
  },
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
}));
