import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: '#f4f4f4',
    backgroundColor: '#ffffff',
    padding: [[24, 0, 24]],

    [breakpoints.down('sm')]: {
      padding: [[18, 0, 18]],
    },
  },
  copyright: {
    textAlign: 'center',
    fontSize: 12,
    lineHeight: '16px',
    color: 'rgba(0, 0, 0, 0.8)',
    margin: 0,

    '& a': {
      color: 'rgba(0, 0, 0, 0.8)',
    },
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: [[0, 0, 16]],
    padding: 0,
    listStyle: 'none',

    [breakpoints.down('sm')]: {
      marginBottom: 14,
    },

    '& a': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: [[0, 16]],
      textAlign: 'center',
      height: '100%',
      textDecoration: 'none',
      borderRight: '1px solid #aaa',

      '&:hover': {
        textDecoration: 'underline',
      },
    },

    '& li:last-child a': {
      borderRight: 'none',
    },
  },
}));
