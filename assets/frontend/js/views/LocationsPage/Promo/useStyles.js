import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[50, 0]],
    backgroundColor: '#fff',

    [breakpoints.down('md')]: {
      padding: [[15, 0]],
    },
  },
  container: {
    display: 'flex',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  item: {
    width: '50%',
    textAlign: 'center',
    position: 'relative',

    '&:last-child': {
      marginLeft: 'auto',
    },

    '&:first-child:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      bottom: 0,
      top: 20,
      width: 1,
      backgroundColor: '#D9D9D9',

      [breakpoints.down('md')]: {
        display: 'none',
      },
    },

    [breakpoints.down('md')]: {
      width: '100%',
      marginBottom: 30,
      textAlign: 'left',
    },
  },
  thumb: {
    display: 'block',
    margin: [[0, 'auto', 50]],

    [breakpoints.down('md')]: {
      marginBottom: 0,
    },
  },
  thumbContainer: {
    margin: [[0, 'auto']],
    position: 'relative',
    maxWidth: 470,
  },
  thumbList: {
    padding: 0,
    margin: 0,
    position: 'absolute',
    top: 50,
    left: -45,

    [breakpoints.down('md')]: {
      left: 0,
    },

    '& > li': {
      display: 'block',
      textAlign: 'right',
    },
  },
  thumbItem: {
    display: 'inline-block',
    backgroundColor: '#fff',
    borderRadius: 90,
    fontSize: 14,
    lineHeight: '17px',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    textAlign: 'right',
    fontWeight: 700,
    marginBottom: 5,
    padding: 3,
    paddingLeft: 10,

    [breakpoints.down('md')]: {
      fontSize: 12,
      lineHeight: 1,
      marginBottom: 3,
    },
  },
  thumbIcon: {
    backgroundColor: '#4A9029',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 19,
    width: 19,
    borderRadius: 50,

    [breakpoints.down('md')]: {
      height: 13,
      width: 13,

      '& svg': {
        height: 6,
        width: 6,
      },
    },
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    lineHeight: 1.33,
  },
  desc: {
    fontSize: 16,
    lineHeight: 1.5,
    maxWidth: 450,
    margin: [[0, 'auto', 25]],
  },

  button: {
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));
