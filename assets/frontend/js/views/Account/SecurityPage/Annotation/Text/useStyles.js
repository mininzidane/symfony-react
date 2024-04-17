import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    width: '100%',
    lineHeight: '28px',
    fontSize: '14px',
    marginTop: 8,
    marginBottom: 14,
    maxWidth: 300,

    [breakpoints.down('sm')]: {
      maxWidth: 'initial',
      ...mixins.font(14, 20, 400),
      color: '#828282',
    },
  },
}));
