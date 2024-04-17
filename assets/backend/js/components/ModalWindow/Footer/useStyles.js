import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    gap: '7px',
    justifyContent: 'flex-end',
    position: 'relative',
    padding: [[10, 20]],
    backgroundColor: '#FFF',
    borderTop: '1px solid #C4C4C4',

    [breakpoints.down('sm')]: {
      padding: [[10, 14]],
    },

    [breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',

      '& > *': {
        width: '100%',
      },

      '& .btn-text': {
        padding: [[6, 10, 4]],
      },
    },
  },
}));
