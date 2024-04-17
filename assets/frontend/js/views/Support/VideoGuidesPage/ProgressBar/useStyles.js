import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    height: 12,
    borderRadius: 2,
    marginTop: 12,
    boxShadow: 'inset 0 0 0 1px #99916A',
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: '#4A9029',
    height: '100%',
    transition: 'width .2s cubic-bezier(0.4, 0, 0.2, 1)',
  },
}));
