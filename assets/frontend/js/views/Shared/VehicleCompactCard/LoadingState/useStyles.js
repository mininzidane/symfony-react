import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginBottom: 1,
    borderRadius: '0 !important',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
  },
  title: {
    width: '75%',
    height: 16,
  },
  watchlist: {
    width: 30,
    height: 30,
    position: 'relative',
    top: 5,
  },
  imageWrap: {
    backgroundColor: '#E0E0E0',
    width: 130,
    height: 98,
    display: 'grid',
    placeContent: 'center',

    '& img': {
      width: 40,
    },
  },
  body: {
    padding: [[2, 10, 2, 2]],
    display: 'grid',
    gridTemplateColumns: '130px 1fr',
    gridGap: 10,
    marginTop: 10,
  },
  stats: {
    marginTop: 2,
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridGap: 3,
    alignItems: 'start',
  },
  stat1: {
    width: '55%',
    height: 10,
  },
  stat2: {
    width: '65%',
    height: 10,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actions: {
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTop: '1px solid #F1F1F8',
  },
  button: {
    height: 18,
    width: '40%',
  },
}));
