import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[20, 0, 40]],
    minHeight: 400,
    position: 'relative',

    [breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  title: {
    ...mixins.font(16, 16, 400),
    margin: 0,
    color: '#333',
    [breakpoints.down('sm')]: {
      ...mixins.font(16, 24, 700),
    },
  },
  mobileWrap: {
    [breakpoints.down('xs')]: {
      padding: [[0, 14]],
    },
  },
  titleWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: [[18, 0, 10]],

    [breakpoints.down('xs')]: {
      padding: [[12, 14, 6]],
    },
  },
}));
