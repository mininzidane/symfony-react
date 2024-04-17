import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  copyButton: {
    position: 'relative',
    display: 'inline-flex',
    padding: 5,
    margin: '-5px -3px -5px 0',
    width: '22px',
    height: '24px',
    background: 'transparent',
    border: 'none',

    '&:hover': {
      '& svg path': {
        fill: '#999',
      },
    },

    '& svg path': {
      fill: '#BDBDBD',
    },
  },
}));
