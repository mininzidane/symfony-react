import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 'auto',

    [breakpoints.up('lg')]: {
      width: 105,
    },
  },
  label: {
    ...mixins.font(16, 20),
    marginRight: 12,

    [breakpoints.only('md')]: {
      display: 'none',
    },
  },
}));
