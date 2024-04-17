import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  content: {
    backgroundColor: '#fff',
    padding: 20,
    display: 'grid',
    gridTemplateColumns: '1fr 0.862fr',
    alignItems: 'flex-start',

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 0.9fr',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 14,
      padding: [[14, 12]],
    },
  },
  form: {
    marginRight: 20,

    [breakpoints.down('sm')]: {
      padding: 0,
      paddingBottom: 4,
      marginRight: 0,
    },
  },
}));
