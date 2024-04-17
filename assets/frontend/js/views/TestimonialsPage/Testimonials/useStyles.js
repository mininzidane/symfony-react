import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    columns: '5',
    columnGap: '12px',
    marginBottom: '-12px',
    [breakpoints.down(1440)]: {
      columns: '4',
    },
    [breakpoints.down('lg')]: {
      columns: '3',
    },
    [breakpoints.down('md')]: {
      columns: '2',
    },
    [breakpoints.down('sm')]: {
      columns: '1',
    },
  },
  card: {
    marginBottom: 12,
    display: 'inline-block',
    breakInside: 'avoid',
    width: '100%',
  },
  pagination: {
    marginTop: 40,
    marginBottom: 40,
    [breakpoints.down('sm')]: {
      marginTop: 30,
      marginBottom: 30,
    },
  },
}));
