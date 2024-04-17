import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 32,

    [breakpoints.up('md')]: {
      paddingBottom: 40,
    },
  },
  title: {
    ...mixins.font(24, 32, 400),
    margin: [[40, 0, 0]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
  descriptions: {
    margin: [[10, 0, 28]],
    textAlign: 'center',
  },
  cta: {
    minWidth: 180,
  },
}));
