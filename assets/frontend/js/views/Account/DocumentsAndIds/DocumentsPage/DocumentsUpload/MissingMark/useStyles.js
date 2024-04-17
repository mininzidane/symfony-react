import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 20px',
    gridGap: 10,
    color: '#B20000',
    fontSize: 14,
    lineHeight: '20px',

    [breakpoints.down('sm')]: {
      gridGap: 0,
    },
  },
}));
