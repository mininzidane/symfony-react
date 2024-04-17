import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 4000,
    background: '#2158F5',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    justifyContent: 'space-between',
    transform: 'translateY(-120%)',
    transition: 'transform .2s ease',

    '&.is-revealed': {
      transform: 'translateY(0)',
    },
  },
  title: {
    ...mixins.font(12, 16, 700),
    color: '#FFF',
  },
  ymm: {
    ...mixins.font(14, 18, 400),
    color: '#FFF',
    marginTop: 2,
  },
  help: {
    ...mixins.font(12, 16, 400),
    color: '#FFF',
    textAlign: 'right',
  },
  phone: {
    ...mixins.font(14, 18, 700),
    marginTop: 2,

    '& a': {
      color: '#FFF !important',
      textDecoration: 'none !important',
    },
  },
}));
