import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  bidLabel: {
    margin: [[0, 0, 2, 0]],
  },
  bidInput: {
    display: 'flex',

    '& > div': {
      flex: 1,
    },
  },
  feeCalculatorTrigger: {
    marginTop: '0 !important',
  },
}));
