import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
    gridGap: 14,
    marginTop: 28,
    '@media (max-width: 1440px)': {
      gridTemplateColumns: '1.28fr 1fr 1fr 1fr',
      maxWidth: '1135px',
      marginRight: 'auto',
      marginLeft: 'auto',
    },
    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1.34fr 1fr 1fr 1fr',
      maxWidth: '974px',
    },
  },
}));
