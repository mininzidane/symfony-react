import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 19),
    color: '#333',
  },
  number: {
    ...mixins.circle(20, '#2158F5'),
    ...mixins.font(12, 20, 'bold'),
    color: '#fff',
    textAlign: 'center',
  },
}));
