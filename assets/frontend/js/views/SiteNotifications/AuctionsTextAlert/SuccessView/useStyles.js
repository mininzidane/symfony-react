import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    maxWidth: 600,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 700,
    marginBottom: 13,
    color: '#226900',
    marginRight: 20,

    '& :first-child': {
      marginRight: 7,
    },
  },
  msg: {
    fontSize: '16px',
    lineHeight: '24px',
  },
}));
