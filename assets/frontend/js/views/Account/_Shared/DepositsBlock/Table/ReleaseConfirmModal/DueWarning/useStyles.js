import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[14, 20, 16]],
    margin: [[-20, -20, 20]],
    backgroundColor: '#BB2200',

    [breakpoints.down('sm')]: {
      padding: [[12, 14, 16]],
      margin: [[-14, -14, 14]],
    },
  },
  title: {
    ...mixins.font(18, 22, 700),
    color: '#FFF',
    marginBottom: 8,

    '& span': {
      fontWeight: 700,
    },
  },
  description: {
    ...mixins.font(14, 20, 400),
    color: '#FFF',
  },
}));
