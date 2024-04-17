import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    border: '1px solid #2158F5',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    paddingRight: 20,
  },
  icon: {
    marginRight: 7,
  },
  link: {
    marginLeft: 'auto',
  },
}));
