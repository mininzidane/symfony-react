import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'relative',
    height: 0,
    width: '100%',
    overflow: 'hidden',
    paddingBottom: ({ ratio }) => `${ratio}%`,
  },
  overlay: {
    '&:after': {
      content: '""',
      backgroundColor: 'rgba(0,0,0,.4)',
      zIndex: 1,
      ...mixins.coverer(),
    },
  },
}));
