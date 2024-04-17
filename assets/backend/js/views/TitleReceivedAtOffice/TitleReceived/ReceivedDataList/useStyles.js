import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  wrap: {
    display: 'inline-block',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1px',
    alignItems: 'center',
    '& div:first-child': {
      marginRight: '8px',
      whiteSpace: 'nowrap',
    },
  },
  tracking: {
    textAlign: 'right',
    wordBreak: 'break-all',
    width: '100%',
  },
  loader: {
    marginBottom: -3,
    marginLeft: 6,
  },
  checkmark: {
    width: 15,
    height: 11,
    display: 'block',
    marginLeft: 6,
    marginTop: -2,
  },
}));
