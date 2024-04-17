import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#FFF',
    paddingRight: 80,
    cursor: 'default',
    minWidth: 280,
    height: 40,

    [breakpoints.down('xs')]: {
      width: '100%',
    },

    '&.is-focused': {
      boxShadow: 'inset 0 0 0 1px #2158F5',
      borderColor: '#2158F5',
    },
  },
  grid: {
    display: 'flex',
    alignItems: 'center',

    '& > *:not(:first-child)': {
      marginLeft: 4,
    },
  },
}));
