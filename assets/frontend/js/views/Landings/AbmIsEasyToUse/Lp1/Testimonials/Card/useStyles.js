import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  content: {
    textAlign: 'left',
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '46px auto',
    gridGap: 12,

    [breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  image: {
    width: 46,
    height: 46,
  },
  ratingStars: {
    width: 64,
    margin: [[2, 0]],
  },
  desc: {
    fontSize: '16px',
    lineHeight: '22px',
    marginTop: 18,
    color: '#333',

    [breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  rating: {
    fontSize: 11,
    lineHeight: '15px',
    color: '#B2B2B2',
  },
  name: {
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 700,
    marginTop: -6,
  },
}));
