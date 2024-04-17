import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2158F5',
    padding: [[6, 20]],
    position: 'relative',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,

    [breakpoints.down('sm')]: {
      padding: [[12, 8, 16]],
      flexWrap: 'wrap',
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
  },
  closeButton: {
    marginLeft: 'auto',

    [breakpoints.down('sm')]: {
      position: 'absolute',
      top: 16,
      right: 14,
    },
  },
  body: {
    padding: 18,
    position: 'relative',

    [breakpoints.down('sm')]: {
      padding: 8,
    },
  },

  iframe: {
    height: '100%',
  },
}));
