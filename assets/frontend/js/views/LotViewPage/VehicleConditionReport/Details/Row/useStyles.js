import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    padding: '4px 0 5px',
    lineHeight: '18px',

    '&:not(:first-child)': {
      borderTop: '1px solid #E3E3E3',
    },

    '&.is-striped:nth-child(even)': {
      backgroundColor: '#F7F9FD',
    },
  },
  score: {
    marginRight: 8,
  },
}));
