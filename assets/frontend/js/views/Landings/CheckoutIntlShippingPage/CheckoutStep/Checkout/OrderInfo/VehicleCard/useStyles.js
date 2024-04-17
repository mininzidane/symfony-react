import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',

    [breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
  },
  image: {
    width: 132,
    height: 100,
    backgroundPosition: '50%',
    backgroundSize: 'cover',
    marginRight: 21,
    flexShrink: 0,

    [breakpoints.down('sm')]: {
      width: '100%',
      paddingBottom: '75%',
      marginRight: 0,
      marginBottom: 12,
    },
  },
  details: {
    width: '100%',
  },
  detail: {
    ...mixins.font(16, 32, 400),
    color: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #BDBDBD',

    '&:last-child': {
      borderBottom: 0,
    },

    '& > div:last-child': {
      fontWeight: 700,
      marginLeft: 8,
    },
  },
}));
