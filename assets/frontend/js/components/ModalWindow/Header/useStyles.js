import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2158F5',
    padding: [[6, 20]],
    position: 'relative',
    minHeight: 42,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,

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

    '&:hover': {
      opacity: 0.75,
    },
  },
  controls: {
    marginLeft: 'auto',
    paddingRight: 15,
  },
}));
