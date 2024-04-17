import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',

    [breakpoints.down('sm')]: {
      justifyContent: 'flex-start',
    },

    '& > div': {
      whiteSpace: 'nowrap',

      '&:first-child': {
        marginRight: 5,
      },
    },

    '& strong': {
      whiteSpace: 'nowrap',
    },
  },
  value: {
    color: '#333',
  },
}));
