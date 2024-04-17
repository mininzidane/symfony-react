import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins, isMobileView }) => ({
  root: {
    background: '#FFFCDF',
    padding: [[20, 30]],
    borderTopRightRadius: 4,

    [breakpoints.down(isMobileView ? 'xl' : 'md')]: {
      padding: [[15, 20, 20, 20]],
      display: 'none',
    },
  },
  title: {
    ...mixins.font(14, 20, 700),
    color: '#999889',
    marginBottom: 16,
    textTransform: 'uppercase',

    [breakpoints.down(isMobileView ? 'xl' : 'md')]: {
      ...mixins.font(16, 18),
    },
  },
}));
