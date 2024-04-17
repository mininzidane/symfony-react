import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  button: {
    textTransform: 'uppercase',
    margin: [[25, 'auto', 0]],
    minWidth: 210,
    width: 'auto',
  },
  title: {
    ...mixins.font(16, 24, 700),
    color: '#333',
  },
  subtitle: {
    ...mixins.font(14, 20, 400),
    color: '#828282',

    [breakpoints.up('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
  desc: {
    ...mixins.font(12, 18, 400),
    marginTop: 5,
    color: '#828282',
  },
}));
