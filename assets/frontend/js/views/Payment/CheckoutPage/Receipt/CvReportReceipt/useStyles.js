import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    padding: 0,
  },
  title: {
    [breakpoints.down('sm')]: {
      fontSize: 20,
      lineHeight: '27px',
    },
  },
  subtitle: {
    maxWidth: 700,
    margin: [[0, 'auto', -22]],

    [breakpoints.down('sm')]: {
      margin: [[6, 'auto', -20]],
      fontSize: 14,
      lineHeight: '20px',
    },

    '& strong': {
      fontWeight: '300 !important',

      [breakpoints.down('sm')]: {
        wordBreak: 'break-all',
      },
    },
  },
  transactions: {
    marginTop: 2,
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 14,
    paddingTop: 22,
    paddingBottom: 22,
    background: '#FFF',

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
      gridGap: 12,
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  wrap: {
    maxWidth: 480,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    [breakpoints.down('sm')]: {
      paddingTop: 20,
    },
  },
}));
