import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: [[32, 0, 36]],
    textAlign: 'center',

    [breakpoints.up('lg')]: {
      paddingBottom: 50,
    },
  },
  advantages: {
    display: 'grid',
    gridTemplateColumns: '1fr',

    [breakpoints.up('sm')]: {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '14px',
    },

    [breakpoints.up('md')]: {
      gridTemplateColumns: '1fr 1fr 1fr',
      gridGap: '14px 24px',
    },
  },
  title: {
    maxWidth: '82%',
    margin: '0 auto',
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,
    marginBottom: '-5px',

    [breakpoints.up('md')]: {
      fontSize: 23,
      lineHeight: '30px',
      marginBottom: '14px',
    },

    [breakpoints.up('lg')]: {
      maxWidth: 790,
      fontSize: 30,
      lineHeight: '40px',
    },
  },
}));
