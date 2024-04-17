import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  banner: {
    display: 'flex',
    width: '100%',
    marginBottom: 42,
    position: 'relative',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  bannerImg: {
    width: '100%',
  },
  channelLink: {
    position: 'absolute',
    top: 30,
    right: 30,
    display: 'flex',
    alignItems: 'center',
    paddingRight: 14,
    backgroundColor: 'transparent',
    transition: 'all .2s ease',
    border: '1px solid transparent',
    borderRadius: 999,

    [breakpoints.down('sm')]: {
      position: 'static',
      backgroundColor: '#000',
      padding: 5,
      borderRadius: 0,
    },

    '&:hover': {
      backgroundColor: '#000',
      border: '1px solid white',
    },
  },
  channelIcon: {
    width: 60,
    height: 60,
    marginRight: 14,

    [breakpoints.down('sm')]: {
      width: 33,
      height: 33,
    },
  },
  youtubeLogo: {
    width: 240,

    [breakpoints.down('sm')]: {
      width: 170,
    },
  },
}));
