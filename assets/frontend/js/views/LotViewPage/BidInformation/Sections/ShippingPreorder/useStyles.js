import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  transportation: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  expandIcon: {
    width: 32,
    height: 32,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: 'auto',
    marginTop: '-5px',
    marginRight: '-10px',
    flexShrink: '0',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '0',
      height: '5px',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid #333',
      transition: '.2s',
    },
    '&.is-active': {
      '&:after': {
        transform: 'rotate(-180deg)',
      },
    },
  },
}));
