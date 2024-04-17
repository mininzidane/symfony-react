import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    textAlign: 'center',
    padding: [[10, 5]],
    minWidth: 50,
    borderRadius: 2,
    marginLeft: 1,
    outline: 'none',
    color: 'black',
    transition: 'backgroundColor .15s ease, color .15s ease',

    '&:hover': {
      backgroundColor: 'rgba(0,113,188,.05)',
      color: '#2158F5',
    },
  },
  icon: {
    height: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  label: {
    fontSize: 10,
    lineHeight: '10px',
    fontWeight: 400,
  },
}));
