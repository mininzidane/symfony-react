import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    marginRight: -8,
  },
  select: {
    color: '#fff',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    height: '32px',
    padding: '0px 8px 0px 8px',
    backgroundColor: 'transparent',
    border: '0',
    textTransform: 'uppercase',
    transition: 'background-color 0.2s ease 0s',
    '&:hover': {
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    '&:after': {
      margin: '0px 1px 0 11px',
      borderWidth: '4px 4px 0',
    },
  },
  icon: {
    width: '14px',
    height: '14px',
    padding: '0px',
  },
  label: {
    marginLeft: '6px',
    marginRight: '-5px',
    fontSize: '14px',
  },
}));
