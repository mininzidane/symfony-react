import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  head: {
    ...mixins.font(14, 20, 700),
  },
  body: {
    ...mixins.font(14, 20, 400),
    paddingTop: 2,

    '& strong': {
      ...mixins.font(14, 20),

      '& span': {
        fontWeight: 700,
      },
    },
  },
}));
