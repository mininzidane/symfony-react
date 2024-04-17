import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  grid: {
    paddingTop: 12,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 20,

    [breakpoints.down('md')]: {
      gridGap: 14,
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  title: {
    ...mixins.font(24, 32, 400),
    color: '#333',
    padding: [[25, 24, 15]],

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20),
      padding: [[12, 14]],
    },
  },
}));
