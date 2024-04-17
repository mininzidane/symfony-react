import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: [[0, 8]],

    '& > button': {
      width: 'max-content',
      color: '#2158F5',
      cursor: 'pointer',
      textDecoration: 'underline',
    },

    '& > svg': {
      width: '14px',
      height: '14px',
      fill: '#2158F5',
      marginRight: '2px',
    },
  },
}));
