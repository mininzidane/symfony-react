import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  contactsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  phoneContainer: {
    display: 'grid',
    gridTemplateColumns: '20px auto',
    gridGap: 6,
    alignItems: 'center',

    '&:hover': {
      '& img': {
        opacity: 0.75,
      },

      '& $phoneNumber': {
        textDecoration: 'underline',
      },
    },
  },
  phoneNumber: {
    color: '#FFF',
  },
}));
