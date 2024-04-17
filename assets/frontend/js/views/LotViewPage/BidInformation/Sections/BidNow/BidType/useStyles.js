import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    fontSize: '14px',
    display: 'flex',
    paddingBottom: 21,
    gap: 12,
    flexWrap: 'wrap',
  },
  radioButton: {
    '& label': {
      color: '#333',
    },
    '&:hover label': {
      color: '#2158F5',
    },
    '&.is-checked label': {
      color: '#2158F5',
    },
  },
  radioButtonsGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    justifyContent: 'start',
    gridGap: 15,
  },
  radioButtonWrap: {
    display: 'flex',
  },
}));
