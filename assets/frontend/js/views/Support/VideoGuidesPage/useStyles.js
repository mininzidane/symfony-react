import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    minHeight: 500,
    paddingBottom: 100,

    [breakpoints.down('md')]: {
      paddingBottom: 50,
    },
  },
  grid: {
    marginTop: 30,
    display: 'grid',
    gridTemplateColumns: '64fr 36fr',
    gridGap: 35,

    [breakpoints.down('lg')]: {
      gridGap: 20,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },

    [breakpoints.down('sm')]: {
      marginTop: 17,
    },
  },
  videoCard: {
    [breakpoints.down('sm')]: {
      marginLeft: 'calc((100vw - 100%) / -2)',
      marginRight: 'calc((100vw - 100%) / -2)',
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  videoContainer: {
    position: 'relative',
    paddingTop: '58.3%',
    backgroundColor: '#FFF',
    borderRadius: 4,
    overflow: 'hidden',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',

    [breakpoints.down('md')]: {
      paddingTop: '56.25%',
    },

    [breakpoints.down('sm')]: {
      borderRadius: 0,
      boxShadow: 'none',
    },
  },
  video: {
    width: '100% !important',
    height: '100% !important',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 20,
  },
  menuCard: {
    padding: [[25, 30]],
    background: '#FFF2B1',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,

    [breakpoints.down('sm')]: {
      padding: 20,
      minHeight: 350,
    },
  },
  menuList: {
    marginTop: 25,
  },
  loader: {
    minHeight: 450,
    position: 'relative',
  },
}));
