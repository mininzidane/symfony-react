import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[35, 0]],

    [breakpoints.down('md')]: {
      padding: [[14, 0]],
    },
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '6fr 5fr',
    gridGap: 24,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 14,
      justifyItems: 'center',
    },
  },
  hide: {
    display: 'none !important',
  },
  title: {
    padding: [[30, 24, 0]],
    fontSize: '38px',
    lineHeight: '46px',
    fontWeight: 400,
    color: '#FFFFFF',
    margin: 0,

    [breakpoints.down('md')]: {
      padding: [[20, 14, 0]],
      fontSize: '20px',
      lineHeight: '27px',
    },
  },
  promo: {
    backgroundColor: 'rgba(0,0,0,.65)',
    borderRadius: 20,
    overflow: 'hidden',

    [breakpoints.down('md')]: {
      maxWidth: 510,
    },
  },
  features: {
    padding: [[0, 20]],
    color: '#fff',
  },
  feature: {
    fontSize: '26px',
    lineHeight: 1.6,
    fontWeight: 700,
    marginBottom: 4,
    listStyleType: 'disc',

    [breakpoints.down('md')]: {
      fontSize: '24px',
      lineHeight: '33px',
    },

    [breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '30px',
    },
  },
}));
