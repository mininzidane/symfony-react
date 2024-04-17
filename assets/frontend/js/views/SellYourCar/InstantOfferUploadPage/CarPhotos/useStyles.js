import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 30px 0',
    [breakpoints.down('sm')]: {
      padding: '15px 0px 0',
    },
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginBottom: 16,
    padding: '0 14px',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      ...mixins.font(18, 22, 300),
    },
  },
  form: {
    background: '#FFFFFF',
    border: '1px solid #E0E0E0',
    borderRadius: '4px',
    padding: '13px 14px 14px',
    maxWidth: 1140,
    width: '100%',
    marginBottom: '24px',
    [breakpoints.down('sm')]: {
      borderRight: 'none',
      borderLeft: 'none',
      borderRadius: '0',
    },
  },
}));
