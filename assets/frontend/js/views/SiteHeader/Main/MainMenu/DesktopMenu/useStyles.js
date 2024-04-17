import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  navigation: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    position: 'relative',

    '& > li': {
      marginRight: 27,
      listStyle: 'none',

      '&:last-child': {
        marginRight: 0,
      },
    },
  },
  settings: {
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    flexShrink: 0,

    '& > li': {
      marginLeft: 21,
      listStyle: 'none',
    },
  },
  contacts: {
    display: 'flex',
    alignItems: 'center',
  },
  gap: {
    width: '100%',
  },
}));
