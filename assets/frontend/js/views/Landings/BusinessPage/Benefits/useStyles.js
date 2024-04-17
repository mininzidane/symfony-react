import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[35, 0, 18]],
    backgroundColor: '#FFFFFF',

    [breakpoints.down('md')]: {
      borderTop: '1px solid #F1F1F8',
    },

    [breakpoints.down('sm')]: {
      padding: [[22, 0]],
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
      textAlign: 'left',
    },
  },
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 80,
    marginTop: 30,

    [breakpoints.down('lg')]: {
      gridGap: 40,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
      marginTop: 15,
    },
  },
}));
