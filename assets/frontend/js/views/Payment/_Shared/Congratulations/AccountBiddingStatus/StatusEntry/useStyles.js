import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'space-between',
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',

    '& > button': {
      borderBottom: '1px dotted #777',
    },
  },
  iconWrap: {
    display: 'flex',
    alignItems: 'center',
    width: 20,
  },
}));
