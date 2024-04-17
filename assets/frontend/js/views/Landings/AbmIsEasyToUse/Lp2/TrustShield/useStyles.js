import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[70, 0, 20]],
    background: '#F1F1F1',

    [breakpoints.down('md')]: {
      padding: [[40, 0]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridGap: 60,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 50,
    },
  },
  buttonWrap: {
    padding: [[60, 0]],
    display: 'flex',

    [breakpoints.down('sm')]: {
      padding: [[25, 0, 35]],
      justifyContent: 'center',
    },
  },
  buttonWrapMobile: {
    padding: [[40, 0, 0]],
    display: 'flex',
    justifyContent: 'center',
  },
  description: {
    fontSize: '16px',
    lineHeight: '25px',
    fontWeight: '400',
    color: '#615E4D',
    background: '#F3EBC0',
    borderRadius: '4px',
    padding: '35px 40px',
    marginTop: '50px',
    textAlign: 'center',

    [breakpoints.down('md')]: {
      padding: '20px',
      marginTop: '35px',
    },
  },
  aside: {
    textAlign: 'center',
    paddingTop: 30,

    [breakpoints.down('md')]: {
      paddingTop: 0,
    },
  },
}));
