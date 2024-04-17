import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 24),
    background: '#E1E1ED',
    borderRadius: '4px',
    padding: '3px 12px',
    marginTop: '12px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '50px',
  },
}));
