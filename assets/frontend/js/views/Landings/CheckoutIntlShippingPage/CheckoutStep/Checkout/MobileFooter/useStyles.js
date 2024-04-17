import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 4000,
    background: '#EEEEEE',
    boxShadow: '0px -2px 3px rgba(0, 0, 0, 0.15)',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transform: 'translateY(120%)',
    transition: 'transform .2s ease',

    '&.is-revealed': {
      transform: 'translateY(0)',
    },
  },
  title: {
    ...mixins.font(14, 18, 700),
    color: '#333333',
    textTransform: 'uppercase',

    '& span': {
      fontWeight: 400,
    },
  },
  delivery: {
    ...mixins.font(12, 16, 400),
    color: '#333333',
    marginTop: 2,
  },
  valueSection: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  price: {
    ...mixins.font(20, 26, 700),
    marginRight: 8,
    color: '#333333',
  },
}));
