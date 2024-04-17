import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    padding: [[18, 40, 18, 30]],
    borderRadius: 4,
    color: '#4F4F4F',
    background: '#FAFAFA',

    [breakpoints.down('xs')]: {
      padding: [[20, 25]],
    },
  },
  content: {
    paddingRight: 50,

    [breakpoints.down('sm')]: {
      paddingRight: 20,
    },

    [breakpoints.down('xs')]: {
      paddingRight: 0,
    },
  },
  title: {
    margin: 0,
    fontSize: 16,
    fontWeight: 700,
    lineHeight: '24px',
  },
  text: {
    margin: [[7, 0, 0]],
    fontWeight: 400,
    lineHeight: '20px',
    fontSize: 14,
  },
  grid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    [breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  cta: {
    flexShrink: 0,
    paddingLeft: [[18], '!important'],
    paddingRight: [[16], '!important'],

    [breakpoints.down('xs')]: {
      marginTop: 18,
      width: [['100%'], '!important'],
      paddingLeft: [[0], '!important'],
      paddingRight: [[0], '!important'],
    },
  },
  closeBtn: {
    position: 'absolute',
    top: 14,
    right: 14,
  },
  thumb: {
    width: 17,
    height: 15,
    margin: [[0, 8, 0, -5]],
  },
}));
