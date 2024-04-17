import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F4F0E0',
    overflow: 'hidden',
  },
  title: {
    fontSize: '32px',
    lineHeight: '43px',
    fontWeight: '300',
    margin: '50px 0',
    color: '#313135',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '32px',
      margin: '40px 0',
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 35,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 25,
    },
  },
  buttonWrap: {
    padding: [[60, 0]],
    display: 'grid',
    placeItems: 'center',

    [breakpoints.down('sm')]: {
      padding: [[40, 0]],
    },
  },
}));
