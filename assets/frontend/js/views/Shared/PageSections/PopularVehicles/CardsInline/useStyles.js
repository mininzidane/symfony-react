import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 24,
    marginTop: 28,
    '@media (max-width: 1440px)': {
      maxWidth: '1135px',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [breakpoints.down('lg')]: {
      maxWidth: '974px',
    },
    [breakpoints.down('md')]: {
      gridGap: 14,
    },
  },
}));
