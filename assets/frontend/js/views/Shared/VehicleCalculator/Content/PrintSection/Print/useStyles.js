import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isLegacyView, breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 30,

    [breakpoints.down('sm')]: {
      marginRight: 10,
    },
  },
  icon: {
    marginRight: 7,
  },
  label: isLegacyView
    ? {}
    : {
        [breakpoints.down('sm')]: {
          display: 'none',
        },
      },
}));
