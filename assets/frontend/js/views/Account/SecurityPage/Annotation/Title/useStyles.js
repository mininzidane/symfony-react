import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    color: 'rgb(170, 170, 170)',
    fontSize: '24px',
    lineHeight: '32px',
    marginTop: 8,
    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20, 700),
      color: '#828282',
    },
  },
}));
