import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: [[30, 14]],
    minHeight: 500,
  },
  card: {
    width: 500,
    margin: [[0, 'auto']],
    padding: [[30, 14, 14]],
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    color: '#000',
    fontSize: '28px',
    lineHeight: '37px',
    fontWeight: '300',
    margin: '5px 0 0',

    [breakpoints.down('sm')]: {
      fontSize: '22px',
      lineHeight: '28px',
    },
  },
  subtitle: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '700',
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 14,
    padding: 14,
    borderRadius: 6,
    backgroundColor: '#E6ECFD',
    marginTop: 38,

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'center',
    gridGap: 14,
    paddingBottom: 16,
  },
}));
