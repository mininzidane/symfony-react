import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    ...mixins.extraHitbox(),
    position: 'relative',
    flexShrink: 0,
    marginRight: 27,
    [breakpoints.down('md')]: {
      marginRight: 8,
    },
    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  icon: {
    display: 'block',
    width: 139,
    height: 38,

    [breakpoints.down('md')]: {
      width: 88,
      height: 24,
    },
  },
}));
