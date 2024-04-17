import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: ({ hasTopMargin }) => ({
    ...mixins.font(24, 30, 300),
    margin: hasTopMargin ? [[21, 0, 0]] : 0,
    color: '#333',

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
      marginTop: hasTopMargin ? 19 : 0,
      marginRight: 10,
    },
  }),
}));
