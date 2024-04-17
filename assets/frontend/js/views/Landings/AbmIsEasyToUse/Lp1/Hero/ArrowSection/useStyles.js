import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '42px 1fr 150px',
    alignItems: 'center',
    gridGap: 18,
    padding: [[40, 24]],
    backgroundColor: '#000',
    fontWeight: 'bold',
    fontSize: '17px',
    lineHeight: '24px',
    color: '#FDB81E',

    [breakpoints.down('md')]: {
      padding: [[13, 14]],
      gridTemplateColumns: '32px 1fr 55px',
      fontSize: 14,
      gridGap: 10,
      lineHeight: '20px',
    },
  },
  arrow: {
    transform: 'rotate(5deg)',
  },
}));
