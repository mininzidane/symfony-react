import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  head: {
    display: 'grid',
    gridTemplateColumns: 'minmax(136px, auto) 1fr 24px',
    gridGap: '10px',
  },
  button: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#F1F1F8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '-2px',
    marginBottom: '-2px',
    transition: '0.2s ease transform',
    '&.is-active': {
      transform: 'rotate(90deg)',
    },
  },
}));
