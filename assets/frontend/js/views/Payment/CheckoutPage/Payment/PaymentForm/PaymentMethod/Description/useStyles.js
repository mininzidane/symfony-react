import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(14, 20),
    color: '#4F4F4F',
    padding: [[0, 24, 18, 60]],
    marginTop: -5,
    backgroundColor: '#FCFAEC',

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 16, 14]],
    },
  },
  hint: {
    ...mixins.font(14, 18, 700),
    display: 'inline-block',
    color: '#FFF',
    backgroundColor: '#4A9029',
    borderRadius: 2,
    padding: [[2, 6]],
  },
}));
