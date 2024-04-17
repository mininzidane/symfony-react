import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    borderTop: '1px solid #E0E0E0',
  },
  container: {
    maxWidth: 1100,
    margin: [[0, 'auto']],
    padding: [[0, 30, 50]],

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[0, 14, 24]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[42, 0, 15]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[24, 0, 20]],
    },
  },
  description: {
    ...mixins.font(18, 24, 400),
    maxWidth: 800,
    margin: '0 auto',
    textAlign: 'center',
  },
  grid: {
    display: 'flex',
    gap: '60px 20px',
    position: 'relative',
    paddingTop: 40,
    marginTop: 40,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  separator: {
    backgroundColor: '#F1F1F8',
    height: 2,
  },
}));
