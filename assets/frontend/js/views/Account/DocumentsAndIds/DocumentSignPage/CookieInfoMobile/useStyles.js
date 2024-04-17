import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: [[20, 15, 10]],
    textAlign: 'center',
  },
  title: {
    ...mixins.font(18, 24, 700),
    marginTop: 20,
  },
  step: {
    ...mixins.font(14, 20, 400),
    marginTop: 16,
  },
  instructionImage: {
    marginTop: 8,
  },
  footer: {
    ...mixins.font(14, 20, 700),
    marginTop: 20,
  },
}));
