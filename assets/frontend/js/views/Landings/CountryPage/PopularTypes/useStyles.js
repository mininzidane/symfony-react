import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[32, 0, 45]],
    backgroundColor: '#FFFFFF',

    [breakpoints.down('sm')]: {
      paddingBottom: 32,
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: [[0, 0, 50]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      marginBottom: 25,
    },
  },
  container: {
    [breakpoints.up('lg')]: {
      maxWidth: 820,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '330px 330px',
    justifyContent: 'space-between',
    gridGap: 40,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 30,
    },
  },
}));
