import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  signInButton: {
    ...mixins.flex(null, 'center'),
    ...mixins.font(16, 20, 700),
    position: 'relative',
    flexShrink: 0,
    padding: [[10, 24]],
    borderRadius: 25,
    color: '#FFFFFF !important',
    textTransform: 'uppercase',
    textDecoration: 'none !important',
    whiteSpace: 'nowrap',
    transition: 'background-color .2s ease',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
  registerButton: {
    marginLeft: 12,
  },
  signInButtonIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
}));
