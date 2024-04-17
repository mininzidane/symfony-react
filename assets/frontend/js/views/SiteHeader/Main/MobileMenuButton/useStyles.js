import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.extraHitbox([15, 0, 15, 14]),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
  },
  crossIcon: {
    marginRight: 12,
    marginLeft: 2,
  },
  hamburgerIcon: {
    marginRight: 14,

    [breakpoints.down('sm')]: {
      marginRight: 10,
    },
  },
}));
