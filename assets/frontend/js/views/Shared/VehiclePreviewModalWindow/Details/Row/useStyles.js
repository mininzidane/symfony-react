import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '140px auto',
    gridGap: 10,
    padding: [[4, 0]],
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      lineHeight: '23px',
    },
  },
  label: {
    color: '#B1B1B1',
    textAlign: 'right',
  },
  value: {
    fontWeight: 700,
  },
}));
