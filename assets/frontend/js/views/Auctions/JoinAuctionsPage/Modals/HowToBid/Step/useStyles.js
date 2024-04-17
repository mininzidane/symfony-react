import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: 'white',
    borderRadius: 4,
    textAlign: 'center',
    paddingTop: 16,
    height: '100%',

    [breakpoints.down('sm')]: {
      display: 'flex',
      padding: 0,
      paddingRight: 20,
      alignItems: 'center',
      textAlign: 'left',
    },

    '@media(max-width: 375px)': {
      padding: [[8, 14, 10]],
    },
  },
  number: {
    textTransform: 'uppercase',
    fontSize: 12,
    lineHeight: '20px',
    fontWeight: 700,
    color: '#828282',
    marginBottom: 5,

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },

    '@media(max-width: 375px)': {
      display: 'inline-block',
      marginRight: 10,
      fontSize: 14,
    },
  },
  description: {
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 700,

    [breakpoints.down('sm')]: {
      fontSize: 14,
      padding: [[10, 0]],
    },

    [breakpoints.down('xs')]: {
      padding: [[5, 0, 10]],
    },

    [breakpoints.up('md')]: {
      padding: [[0, 40]],
    },

    '@media(max-width: 375px)': {
      display: 'inline',
    },
  },
  image: {
    width: '92%',

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  smallImage: {
    display: 'none',
    position: 'relative',
    minWidth: 100,
    marginTop: 5,
    margin: [[0, 5]],

    [breakpoints.down('sm')]: {
      display: 'block',
    },

    '@media(max-width: 375px)': {
      display: 'none',
    },
  },
}));
