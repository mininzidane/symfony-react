import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: [[6, 0]],
    backgroundColor: '#4A9029',
    minHeight: '32px',
  },
  message: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '19px',
  },
  link: {
    display: 'inline-block',
    color: '#FFF !important',
    textDecoration: 'none !important',
    '& span': {
      borderBottom: '1px solid #90CAA9',
    },
    '&:hover span': {
      borderBottomColor: 'transparent',
    },
  },
}));
