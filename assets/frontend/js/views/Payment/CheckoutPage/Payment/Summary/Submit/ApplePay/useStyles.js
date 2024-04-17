import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'inline-block',
    cursor: 'pointer',
    width: '100%',
    height: '40px',
    borderRadius: '25px',
    '-webkit-appearance': '-apple-pay-button',
    '-apple-pay-button-type': 'check-out' /* Use any supported button type. */,
    '-apple-pay-button-style': 'black',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    transition: 'box-shadow .1s ease, background-color .2s ease',

    /* Older versions of safari */
    '@supports not (-webkit-appearance: -apple-pay-button)': {
      '&': {
        display: 'inline-block',
        cursor: 'pointer',
        width: '100%',
        height: '40px',
        backgroundSize: '100% 60%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50 % 50 %',
        borderRadius: '25px',
        padding: 0,
        boxSizing: 'border-box',
        minWidth: '200px',
        minHeight: '32px',
        maxHeight: '64px',
      },
    },
  },
}));
