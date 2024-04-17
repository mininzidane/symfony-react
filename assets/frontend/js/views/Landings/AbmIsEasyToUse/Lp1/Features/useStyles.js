import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: '#FFFFFF',
    padding: [[36, 0]],

    [breakpoints.down('md')]: {
      padding: [[14, 0]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 10,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  },
  feature: {
    backgroundColor: '#FFF0CF',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    padding: [[20, 24, 30]],

    [breakpoints.down('md')]: {
      padding: [[18, 14, 20]],
    },
  },
  title: {
    fontSize: 24,
    lineHeight: '32px',
    fontWeight: 700,
    color: '#333333',
    textTransform: 'capitalize',

    [breakpoints.down('md')]: {
      fontSize: 18,
      lineHeight: '24px',
    },
  },
  text: {
    fontSize: 16,
    lineHeight: '24px',
    marginTop: 12,

    [breakpoints.down('md')]: {
      fontSize: 16,
      marginTop: 8,
    },
  },
}));
