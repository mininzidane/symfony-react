import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 10px',
    position: 'absolute',
    top: 37,
    left: 0,
    width: '100%',
    padding: [[10, 11]],
    zIndex: 20,
    border: '1px solid #2158F5',
    boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)',
    borderTop: 'none',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#FFF',
  },
  button: {
    ...mixins.font(14, 20),
    padding: [[3, 11, 5]],
    borderRadius: 30,
    border: '1px solid #2158F5',
    color: '#2158F5',
    height: 30,
    backgroundColor: '#FFF',
    transition: 'all 0.2s ease',

    '&:hover': {
      color: '#FFF',
      backgroundColor: '#4878FF',
      borderColor: '#4878FF',
    },

    '&:active': {
      color: '#FFF',
      backgroundColor: '#0F44D8',
      borderColor: '#0F44D8',
    },
  },
}));
