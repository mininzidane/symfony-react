import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: 14,
    color: '#333333',
    ...mixins.font(16, 24),
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gridGap: '10px',
    paddingBottom: '12px',
    paddingTop: '4px',
    color: '#BDBDBD',
    ...mixins.font(14, 20),
  },
  author: {
    fontWeight: 700,
    color: '#333',
  },
  description: {},
  ratingStars: {
    width: 72,
    paddingTop: 2,
    paddingBottom: 4,
    marginLeft: 'auto',
  },
  time: {
    textTransform: 'lowercase',
  },
}));
