import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  button: {
    minHeight: 30,
    padding: [[4, 14]],
    display: 'inline-flex',
    alignItems: 'center',
    border: '1px solid #89A5F7',
    backgroundColor: 'transparent',
    color: '#FFF',
    borderRadius: 20,
    transition: 'all .2s ease',

    '&:hover': {
      borderColor: '#FFF',
      color: '#2158F5',
      backgroundColor: '#FFF',

      '& $icon path': {
        fill: '#2158F5',
      },
    },
  },
  icon: {
    width: 11,

    '& path': {
      fill: '#FFF',
      transition: 'all .2s ease',
    },

    '&:first-child': {
      marginRight: 8,
    },

    '&:last-child': {
      marginLeft: 8,
    },
  },
}));
