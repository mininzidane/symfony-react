import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '21px 1fr',
    alignItems: 'stretch',
    gridGap: 8,
    margin: [[14, 0]],
    padding: 12,
    minHeight: 40,
    backgroundColor: '#EDF4EA',
    borderRadius: 4,
  },
  agreement: {
    ...mixins.font(12, 16),
    color: '#2C8700',
  },
  checkmarkContainer: {
    display: 'grid',
    placeItems: 'center',
    borderRight: '1px solid #CCE0C3',
    paddingRight: 8,
  },
  terms: {
    textDecoration: 'underline !important',
    whiteSpace: 'normal !important',

    '&:hover': {
      textDecoration: 'none !important',
    },
  },
}));
