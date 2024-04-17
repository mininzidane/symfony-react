import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: ({ fontSize, lineHeight, fontWeight }) => ({
    ...mixins.font(fontSize, lineHeight, fontWeight),
  }),
  currency: {
    fontWeight: 400,
  },
}));
