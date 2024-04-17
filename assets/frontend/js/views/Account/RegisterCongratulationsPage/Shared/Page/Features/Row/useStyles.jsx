import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '18px 20px',
    flexWrap: 'nowrap',
    backgroundColor: '#FFF1D2',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 4,
    marginTop: 3,
    alignItems: 'center',

    '&:first-child': {
      marginTop: 0,
    },
  },
  text: {
    paddingRight: 20,
  },
}));
