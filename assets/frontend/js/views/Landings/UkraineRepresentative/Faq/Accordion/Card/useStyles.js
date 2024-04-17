import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#fff',
    marginBottom: '18px',
    [breakpoints.down('sm')]: {
      margin: '0 23px',
      marginBottom: '15px',
    },
  },
  container: {
    padding: '26px',
    display: 'flex',
    alignItems: 'flex-start',
    transition: '.5s',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9',
    '&.is-active': {
      padding: '26px 26px 12px',
      transition: '.5s',
      color: '#017DD6',
      backgroundColor: '#fff',
    },
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    [breakpoints.down('sm')]: {
      flexBasis: '90%',
    },
  },
  header: {
    backgroundColor: '#fff',
    outline: 'none',
  },
  arrow: {
    width: '16px',
    marginLeft: 'auto',
    transition: '.3s',
    '&.is-rotate': {
      transform: 'rotate(180deg)',
      transition: '.3s',
      fill: '#017DD6',
    },
  },
  body: {
    padding: '0 27px 0',
    backgroundColor: '#fff',

    [breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    '&.is-padding-bottom': {
      paddingBottom: '25px',
    },
  },
  content: {
    flexBasis: '54%',
    marginRight: '24px',
    lineHeight: '21px',
    fontSize: '16px',

    [breakpoints.down('sm')]: {
      marginBottom: '15px',
    },

    [breakpoints.up('md')]: {
      marginRight: '30px',
    },
    '&.is-flex-basis': {
      flexBasis: '100%',
    },
  },
  img: {
    width: '325px',
    marginRight: '32px',
    display: 'block',
    [breakpoints.down('lg')]: {
      margin: '0 auto',
    },
    [breakpoints.down('xs')]: {
      width: '225px',
    },
  },
}));
