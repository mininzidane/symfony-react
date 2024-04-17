import { makeStyles } from '@material-ui/core/styles';

const green = '#58B095';

export default makeStyles(() => ({
  root: {
    display: 'inline-block',
    background: '#F3F6FB',
    borderRadius: '2px',
    padding: '8px 10px',
    margin: '5px 0',
  },

  textNotificationsText: {
    fontFamily: 'Roboto, serif',
    fontWeight: 500,
    fontSize: '13px',
    color: '#686A6C',
    marginBottom: '5px',
  },

  textNotificationsButton: {
    position: 'relative',
    background: green,
    marginLeft: '10px',

    '& > .spinner-wheel': {
      position: 'absolute',
      left: '8px',
    },
  },

  textNotificationsButtonDisable: {
    '&, &:hover, &:focus, &:active': {
      backgroundColor: '#fff',
      color: green,
    },
  },
}));
