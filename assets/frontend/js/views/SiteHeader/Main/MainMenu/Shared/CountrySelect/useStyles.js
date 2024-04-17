import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  flag: {
    width: 24,
    height: 16,
    borderRadius: 1,
    marginRight: 6,
    marginBottom: -2,
    '&.is-main': {
      [breakpoints.between('sm', 840)]: {
        marginRight: 0,
      },
    },
  },
  country: {
    [breakpoints.between('sm', 840)]: {
      display: 'none',
    },
  },
}));
