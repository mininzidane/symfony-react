import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {},
  grid: {
    display: 'grid',
    gridTemplateColumns: 'calc(60% - 10px) calc(40% - 10px)',
    alignItems: 'start',
    gridGap: 20,
    marginTop: 14,

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'calc(50% - 10px) calc(50% - 10px)',
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '100%',
    },
  },
  imageGalleryWrap: {
    paddingBottom: 'calc(75% + 72px)',
    position: 'relative',
  },
  imageGalleryContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  cvDetails: {
    '& > div': {
      margin: [[20, 0, 0]],
    },
  },
}));
