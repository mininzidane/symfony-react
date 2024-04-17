import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.extraHitbox(),
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#E2E2E2',
    borderRadius: '50%',
    width: 16,
    height: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      backgroundColor: '#2158F5',

      '& $path': {
        fill: '#FFF',
      },
    },
  },
  path: {
    fill: '#555',
  },
}));
