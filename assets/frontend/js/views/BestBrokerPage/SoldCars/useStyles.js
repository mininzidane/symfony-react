import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  soldCars: {
    ...mixins.font(14, 19),
    textAlign: 'center',
    color: '#981B1E',
    paddingTop: 10,
    paddingBottom: 10,
  },
  list: {
    '& > div:nth-child(odd)': {
      backgroundColor: '#F1F1F1',
    },
  },
}));
