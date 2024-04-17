import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: 'calc(50% - 10px)',
    padding: '16px 20px',
    backgroundColor: '#F1F1F1',
    borderRadius: 4,
    fontSize: '14px',
    lineHeight: '19px',

    '& p': {
      marginTop: 21,
      marginBottom: 0,
    },

    '& p:first-child': {
      marginTop: 0,
    },

    [breakpoints.down('md')]: {
      width: '100%',
      marginTop: 15,
    },
  },
}));
