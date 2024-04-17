import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '400',
    width: '100vw',
    maxWidth: '100%',

    '&:not(:first-child)': {
      marginTop: '5px',
    },

    '& > div:last-child': {
      marginLeft: 15,
      whiteSpace: 'nowrap',
    },
  },
}));
