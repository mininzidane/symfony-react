import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  partners: {
    background: '#E6E6E6',
    paddingTop: 15,
    paddingBottom: 15,
  },
  copyrightAndContacts: {
    background: '#EEEEEE',
    textAlign: 'center',
    fontSize: 15,
    lineHeight: '20px',
    fontWeight: 300,
    padding: [[20, 0, 70, 0]],

    [breakpoints.down('sm')]: {
      padding: [[20, 0]],
    },
  },
  contacts: {
    marginTop: 30,
    '& br': {
      display: 'none',
    },

    [breakpoints.down('sm')]: {
      marginTop: 20,

      '& $dot': {
        display: 'none',
      },

      '& br': {
        display: 'block',
      },
    },
  },
  dot: {
    margin: [[0, 10]],
  },
}));
