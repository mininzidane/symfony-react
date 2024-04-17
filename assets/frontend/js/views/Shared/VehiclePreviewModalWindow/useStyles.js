import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[15, 30, 32]],
    maxWidth: 'calc(100vw - 28px)',
    maxHeight: 'calc(100vh - 102px)',
    overflowY: 'auto !important',
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.35)',

    [breakpoints.down('sm')]: {
      padding: [[14, 14, 25]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'start',
    gridGap: 26,
    marginTop: 16,

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 20,
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
}));
