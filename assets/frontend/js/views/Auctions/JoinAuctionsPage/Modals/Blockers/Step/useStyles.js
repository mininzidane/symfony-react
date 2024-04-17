import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    padding: 25,
    background: 'white',
    fontSize: 14,
    lineHeight: '19px',

    '&:not(:last-child)': {
      marginBottom: 3,
    },
  },
  completed: {
    border: '2px solid #47A500',
    padding: 23,

    '& h3': {
      color: '#47A500',
    },
  },
  checkbox: {
    width: 18,
    height: 18,
    marginLeft: 10,
    flexShrink: 0,
  },
  emptyCheckbox: {
    border: '2px solid #707070',
    borderRadius: 2,
  },
}));
