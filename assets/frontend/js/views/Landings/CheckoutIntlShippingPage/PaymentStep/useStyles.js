import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 10,
  },
  stepper: {
    marginBottom: 20,

    '& > div > div:nth-child(2)': {
      fontSize: 14,
    },
  },
  grid: {
    paddingTop: 20,
    display: 'grid',
    gridGap: 20,
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'start',

    '& > div': {
      borderColor: '#BDBDBD',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
