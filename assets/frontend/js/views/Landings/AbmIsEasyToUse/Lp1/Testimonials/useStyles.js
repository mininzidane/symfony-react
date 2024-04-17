import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    padding: [[75, 0, 50]],
    marginTop: -105,

    [breakpoints.down('md')]: {
      paddingBottom: 30,
      padding: [[30, 0]],
      marginTop: -60,
    },
  },
  title: {
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '35px',
    fontSize: 32,
    lineHeight: '44px',
    fontWeight: 400,

    [breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 400,
    },
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 60,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 34,
    },
  },
}));
