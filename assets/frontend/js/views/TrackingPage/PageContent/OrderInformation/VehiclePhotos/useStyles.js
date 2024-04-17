import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  thumbnail: {
    backgroundColor: '#000',
    '&:first-child': {
      gridColumn: 'span 2',
      gridRow: 'span 2',

      '& > div': {
        height: '100%',
      },
    },
  },
  img: {
    '& img': {
      objectFit: 'cover',
    },
  },
  photos: {
    display: 'grid',
    gridGap: 16,
    gridTemplateColumns: 'repeat(4, 1fr)',

    [breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: '14px',
    },
  },
  download: {
    display: 'grid',
    placeItems: 'center',
    backgroundColor: '#E8EEFD',
    borderRadius: 6,
    padding: 18,
    marginTop: 16,
  },
}));
