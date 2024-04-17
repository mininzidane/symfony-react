import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: 30,
    height: 30,
    backgroundColor: '#2158F5',
    color: '#fff',
    display: 'flex',
    fontWeight: 700,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '30px',
    flexShrink: 0,
    '&:after': {
      content: '"i"',
    },
    '&.is-success': {
      backgroundColor: '#4A9029',
      '&:after': {
        display: 'none',
      },
    },
    '&.is-error': {
      backgroundColor: '#A61C10',
      '&:after': {
        content: '"!"',
      },
    },
  },
}));
