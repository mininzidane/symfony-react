import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    padding: [[0, 0, 50]],

    [breakpoints.down('sm')]: {
      padding: [[10, 0, 40]],
    },
  },
  title: {
    ...mixins.font(18, 24, 600),
  },
  text: {
    ...mixins.font(16, 24, 400),
    marginTop: 12,
    color: '#4F4F4F',
  },
  grid: {
    marginTop: 30,
    display: 'grid',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(3, fit-content(320px))',
    gridGap: 20,

    [breakpoints.down('sm')]: {
      marginTop: 20,
      gridTemplateColumns: '1fr',
      gridGap: 20,
    },
  },
  list: {
    color: '#4F4F4F',
    paddingLeft: 15,
    marginBottom: 0,

    '& li:not(:last-child)': {
      marginBottom: 10,
    },

    '& ::marker': {
      color: '#2158F5',
    },
  },
}));
