import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: 0,
    paddingTop: 36,

    [breakpoints.down('sm')]: {
      backgroundImage: 'none !important',
      paddingTop: 24,
    },
  },
  subtitle: {
    margin: [[12, 0, 20]],
    textAlign: 'center',
    ...mixins.font(18, 29),

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 24),
    },
  },
  gradient: {
    height: 70,
    background: 'linear-gradient(0deg, #FDFDFF 0%, rgba(243, 246, 253, 0) 100%)',

    [breakpoints.down('sm')]: {
      height: 20,
    },
  },
}));
