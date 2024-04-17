import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  cta: {
    display: 'block',
    fontWeight: 700,
    textDecoration: 'underline',
    textDecorationStyle: 'dashed',

    '&:hover': {
      textDecoration: 'none',
    },

    '&:not(:first-child)': {
      marginTop: 8,
    },
  },
  additionalDocuments: {
    display: 'flex',
  },
  yes: {
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',

    '& strong': {
      marginRight: 6,
    },
  },
  row: {
    '&:first-child': {
      paddingTop: 0,
    },
    '&:last-child': {
      paddingBottom: 0,
    },
  },
}));
