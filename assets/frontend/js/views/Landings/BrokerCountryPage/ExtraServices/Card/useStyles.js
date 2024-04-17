import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[40, 55, 38]],
    border: '2px solid rgba(0, 0, 0, 0.05)',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    fontSize: 16,
    lineHeight: '26px',
    textAlign: 'center',

    [breakpoints.down('md')]: {
      padding: [[40, 35, 38]],
    },

    [breakpoints.down('sm')]: {
      padding: [[40, 15, 38]],
    },
  },
  title: {
    margin: [[15, 0, 5]],
    fontWeight: 700,
  },
}));
