import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  option: {
    minWidth: 104,
    fontSize: '14px',
  },
  trigger: {
    display: 'inline-flex',
    fontSize: '14px',
    lineHeight: '20px',
  },
  arrow: {
    width: 8,
    margin: [[2, 0, 0, 10]],
    '& path': {
      fill: '#000',
    },
  },
}));
