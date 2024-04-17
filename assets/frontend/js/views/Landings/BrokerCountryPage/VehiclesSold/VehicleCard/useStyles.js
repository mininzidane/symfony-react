import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    background: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',

    '& img': {
      display: 'block',
      width: '100%',
    },
  },
  price: {
    padding: '2px 12px',
    fontWeight: '600',
    color: 'white',
    fontSize: '18px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    backgroundColor: 'rgba(240, 107, 0, .75)',
  },
  currency: {
    fontWeight: 400,
  },
  details: {
    padding: '13px 20px 16px',
  },
  description: {
    ...mixins.textEllipsis(),
    fontSize: 18,
  },
  stats: {
    marginTop: 7,

    '& div': {
      marginTop: 2,
      fontSize: 14,
      color: '#777',
    },
  },
}));
