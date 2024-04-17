import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
    textAlign: 'center',
    backgroundColor: '#fff',
    margin: [[0, 15]],
    maxWidth: 300,

    [breakpoints.down('md')]: {
      margin: 'auto',
      maxWidth: '100%',
      width: '100%',

      '&:not(:last-child)': {
        marginBottom: 14,
      },
    },
  },
  img: {
    position: 'relative',
    width: 300,
    height: 134,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
  icon: {
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, .56)',
    width: 70,
    height: 70,
    borderRadius: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  badge: {
    position: 'absolute',
    right: -5,
    backgroundColor: '#fff',
    borderRadius: '100%',
    width: 20,
    height: 20,
    fontSize: 12,
    lineHeight: '12px',
    fontWeight: 700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...mixins.font(18, 24, 700),
    padding: [[0, 16]],
    paddingTop: 15,
  },
  text: {
    ...mixins.font(16, 21, 300),
    color: '#333',
    padding: [[0, 16]],
    paddingBottom: 15,
  },
}));
