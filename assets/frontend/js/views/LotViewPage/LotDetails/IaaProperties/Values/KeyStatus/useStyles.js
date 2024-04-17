import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: 22,
  },
  keysImage: {
    display: 'block',
    position: 'relative',
    width: 200,
  },
  keysWrap: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gridGap: 5,

    '& strong': {
      color: '#2158F5',
    },
  },
}));
