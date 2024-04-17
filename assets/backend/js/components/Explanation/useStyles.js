import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'inline-block',
    position: 'relative',
  },
  triggerWrap: {
    margin: [[0, 5]],
    cursor: 'pointer',
  },
  arrowEl: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '5px solid white',
  },
  messageWrap: {
    background: '#fff',
    color: '#676a6c',
    padding: [[5, 10]],
    minWidth: 200,
  },
}));
