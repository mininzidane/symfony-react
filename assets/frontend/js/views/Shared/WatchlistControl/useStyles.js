import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'block',

    '&:hover:after': {
      backgroundColor: 'rgba(0, 113, 188, 0.1)',
    },
    'is-active': {
      '& *': {
        fill: '#2158F5',
      },
    },
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    'is-active': {
      '& *': {
        fill: '#fff',
      },
    },
  },
  label: {
    marginLeft: 6,
  },
}));
