import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: '14px',
    padding: '14px',
    [breakpoints.down('sm')]: {
      paddingBottom: '4px',
      paddingTop: 22,
    },
  },
  icon: {
    width: '80px',
    height: '80px',
    background: 'rgba(230,236,253,.6)',
    borderRadius: '50%',
    marginTop: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginTop: '5px',
    [breakpoints.down('sm')]: {
      ...mixins.font(20, 28),
      marginBottom: '4px',
    },
  },
  desc: {
    ...mixins.font(14, 20),
    color: '#828282',
    [breakpoints.down('sm')]: {
      ...mixins.font(12, 18),
    },
  },
}));
