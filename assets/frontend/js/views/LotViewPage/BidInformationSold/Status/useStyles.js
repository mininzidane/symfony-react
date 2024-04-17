import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#B00000',
    color: '#fff',
    padding: 14,
    borderRadius: 6,
  },
  label: {
    ...mixins.font(14, 14, 400),
  },
  value: {
    ...mixins.font(14, 14, 700),
    textTransform: 'uppercase',
  },
}));
