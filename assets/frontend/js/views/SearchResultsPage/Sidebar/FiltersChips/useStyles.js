import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  chipsContainer: {
    padding: [[14, 14, 10]],
    borderBottom: '1px solid #E0E0E0',
    margin: [[0, -14]],

    [breakpoints.down('md')]: {
      padding: [[14, 20, 10]],
      margin: 0,
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
  },
  label: {
    ...mixins.font(14, 20, 700),
    color: '#333333',
  },
}));
