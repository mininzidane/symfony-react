import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    padding: '10px 0',
    background: '#FFF1D2',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.16)',
    marginTop: 1,

    [breakpoints.down('sm')]: {
      padding: [[16, 0, 17]],
    },
  },
  badge: {
    ...mixins.font(10, 14, 700),
    color: '#FFFFFF',
    flexShrink: '0',
    maxWidth: '170px',
    padding: '2px 12px',
    marginRight: '12px',
    borderRadius: '20px',
    backgroundColor: '#4A9029',
    textTransform: 'uppercase',
    textAlign: 'center',

    '&.is-won': {
      backgroundColor: '#226900',
    },

    '&.is-high-bidder': {
      backgroundColor: '#319302',
    },
  },
  message: {
    ...mixins.font(16, 18, 400),
    paddingRight: 20,

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 17, 400),
    },
  },
  cross: {
    top: '50%',
    right: 0,
    marginTop: -5,
    position: 'absolute',

    '&:hover': {
      opacity: 0.6,
    },

    [breakpoints.down('sm')]: {
      top: 4,
      right: 0,
    },
  },
}));
