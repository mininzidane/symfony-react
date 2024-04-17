import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[30, 0, 75]],
    backgroundColor: '#F1F1F8',

    [breakpoints.down('sm')]: {
      padding: [[15, 0, 45]],
    },
  },
  card: {
    marginTop: 30,
    paddingTop: 36,
    paddingBottom: 36,
  },
  cardInnerContainer: {
    maxWidth: 480,
    margin: [[0, 'auto']],
  },
}));
