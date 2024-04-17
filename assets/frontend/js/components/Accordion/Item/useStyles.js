import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginBottom: 15,
  },
  expanded: {
    '& $header': {
      transitionDuration: '300ms',
    },

    '& $arrow': {
      transform: 'rotate(270deg)',
      transitionDuration: '300ms',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 300,
    fontSize: 14,
    lineHeight: '19px',
  },
  title: {},
  arrow: {
    color: '#333',
    height: 8,
    marginLeft: 40,
    marginRight: 16,
    transform: 'rotate(90deg)',
    transition: 'transform 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  },
  content: {
    marginTop: 30,
  },
}));
