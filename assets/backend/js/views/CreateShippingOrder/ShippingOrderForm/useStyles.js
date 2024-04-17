import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    background: 'white',
  },
  inlineAddressField: {
    width: '33%',
  },
  inlineInput: {
    position: 'relative',
    width: '100%',

    '& label': {
      position: 'absolute',
      top: '10px',
      left: '12px',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      color: '#4B5158',
      pointerEvents: 'none',
    },
    '& input': {
      display: 'block',
      height: '40px',
      width: '100%',
      paddingRight: '14px',
      paddingTop: '9px',
      paddingBottom: '9px',
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '400',
      color: '#000',
      borderRadius: '2px',
      border: '1px solid #B7B5B3',
      outline: '0',
    },
    '&.input--address input': {
      paddingLeft: '70px',
    },
    '&.input--city input': {
      paddingLeft: '45px',
    },
    '&.input--zip input': {
      paddingLeft: '70px',
    },
    '&.input--contact input': {
      paddingLeft: '65px',
    },
    '&.input--phone input': {
      paddingLeft: '60px',
    },
    '&.input--ground-quote input': {
      paddingLeft: '100px',
    },
    '&.input--ocean-quote input': {
      paddingLeft: '100px',
    },
  },
  mw800: {
    maxWidth: '800px',
  },
  tooltip: {
    padding: 0,
    border: 0,
    background: 'none',
    fontWeight: 'bold',
  },
}));
