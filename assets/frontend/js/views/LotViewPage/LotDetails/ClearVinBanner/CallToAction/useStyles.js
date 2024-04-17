import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    paddingLeft: '6px !important',
    paddingRight: '12px !important',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  img: {
    width: 18,
    height: 18,
  },
  label: {
    marginLeft: 5,
  },
}));
