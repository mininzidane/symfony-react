import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: [[4, 14, 14]],
  },
  divider: {
    margin: [[7, 0, 4]],
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  cardActionSection: {
    display: 'flex',
    justifyContent: 'space-between',

    '& > *:last-child *': {
      textAlign: 'right',
    },
  },
  trackSection: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 15,

    '& a': {
      whiteSpace: 'normal',
      textAlign: 'center',
    },

    '& > *:last-child': {
      textAlign: 'right',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: 4,
    },
  },
}));
