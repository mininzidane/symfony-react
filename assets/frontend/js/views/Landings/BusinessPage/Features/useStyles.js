import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[35, 0, 40]],
    backgroundColor: '#F1F1F8',

    [breakpoints.down('md')]: {
      borderTop: '1px solid #F1F1F8',
    },

    [breakpoints.down('sm')]: {
      padding: [[22, 0, 30]],
    },
  },
  title: {
    fontSize: 23,
    lineHeight: '30px',
    fontWeight: 400,
    textAlign: 'center',
    margin: 0,

    [breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '24px',
    },
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '16px 70px',
    marginTop: 30,

    [breakpoints.down('lg')]: {
      gridGap: '16px 40px',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: '14px',
    },

    [breakpoints.down('sm')]: {
      marginTop: 24,
      gridTemplateColumns: '1fr 1fr',
    },

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
