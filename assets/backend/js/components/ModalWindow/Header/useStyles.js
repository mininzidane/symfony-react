import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1AB394',
    padding: [[6, 20]],
    position: 'relative',
    minHeight: 40,

    [breakpoints.down('sm')]: {
      padding: [[6, 14]],
    },
  },
  title: {
    ...mixins.font(14, 20, 700),
    color: '#FFFFFF',
  },
  closeButton: {
    flexShrink: 0,
    marginLeft: 12,
    outline: 'none',
    background: 'none',
    boxShadow: 'none',
    border: '0',
    position: 'relative',
    '&:hover': {
      opacity: 0.75,
    },
  },
}));
