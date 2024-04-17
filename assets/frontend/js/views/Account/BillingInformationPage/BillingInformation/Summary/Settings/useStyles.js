import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  card: {
    padding: [[18, 22, 18]],
    backgroundColor: '#FCFAEC',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...mixins.font(24, 30, 300),
    marginTop: 0,
    marginBottom: 15,
    color: '#333',
    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
      marginBottom: 16,
    },
  },
  desc: {
    maxWidth: '216px',
    paddingRight: '15px',
    [breakpoints.down('md')]: {
      maxWidth: '80%',
    },
  },
  switch: {
    marginTop: 4,
  },
}));
