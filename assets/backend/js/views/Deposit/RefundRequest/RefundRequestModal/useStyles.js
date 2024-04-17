import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  errorText: {
    color: '#8A2824',

    '& ul': {
      margin: 0,
      paddingLeft: 15,

      '& li:not(:first-child)': {
        marginTop: 10,
      },
    },
  },
}));
