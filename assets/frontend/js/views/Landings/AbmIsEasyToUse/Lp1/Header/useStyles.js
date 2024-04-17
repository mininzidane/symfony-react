import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
  },
  text: {
    textTransform: 'uppercase',
    fontSize: '19px',
    fontWeight: '700',
    color: '#454545',
    marginTop: '12px',

    [breakpoints.down('lg')]: {
      fontSize: 14,
    },

    [breakpoints.down('md')]: {
      fontSize: 16,
      marginTop: 6,
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  links: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  link: {
    display: 'inline-block',

    '&:first-child': {
      marginRight: 30,
    },
  },
  wrap: {
    height: 80,
    background: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      height: 52,
    },
  },
}));
