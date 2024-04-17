import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    position: 'relative',
    color: '#2158F5',
    ...mixins.extraHitbox(),

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  icon: {
    top: 1,
    left: 0,
    position: 'absolute',

    [breakpoints.down('sm')]: {
      '& svg': {
        width: 12,
      },
    },
  },
  path: {
    fill: 'currentColor',
  },
  label: {
    paddingLeft: 24,

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 16),
      paddingLeft: 16,
    },
  },
}));
