import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  main: {
    background: '#E9F0E6',
    borderRadius: 4,
    padding: 14,
    display: 'flex',
  },
  icon: {
    marginRight: 10,
    marginTop: 2,
    flexShrink: 0,
  },
  title: {
    ...mixins.font(16, 24, 700),
  },
  description: {
    marginTop: 10,
    ...mixins.font(14, 20, 400),
  },
  cta: {
    background: '#E6ECFD',
    borderRadius: 6,
    padding: 14,
    marginTop: 14,
  },
}));
