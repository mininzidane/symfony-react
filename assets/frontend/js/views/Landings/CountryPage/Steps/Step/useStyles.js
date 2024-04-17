import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '64px 1fr',
    gridGap: 20,
    marginTop: 25,
    maxWidth: 720,

    [breakpoints.down('sm')]: {
      marginTop: 28,
      gridGap: 15,
      gridTemplateColumns: '1fr',
      textAlign: 'center',
    },
  },
  title: {
    ...mixins.font(18, 24, 600),
  },
  subtitle: {
    ...mixins.font(16, 24, 400),
    marginTop: 5,
    color: '#4F4F4F',
  },
  icon: {
    [breakpoints.up('md')]: {
      marginTop: 4,
    },

    '& img': {
      display: 'block',
      margin: [[0, 'auto']],
    },
  },
}));
