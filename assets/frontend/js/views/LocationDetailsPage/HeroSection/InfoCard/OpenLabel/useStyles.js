import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '6px 1fr',
    gridGap: 6,
    alignItems: 'center',
  },
  dot: {
    borderRadius: '50%',
    backgroundColor: '#BB2200',
    width: 6,
    height: 6,

    '&.is-open': {
      backgroundColor: '#4B9028',
    },
  },
  label: {
    ...mixins.font(12, 16),
    textTransform: 'uppercase',
    color: '#BB2200',

    '&.is-open': {
      color: '#4B9028',
    },
  },
}));
