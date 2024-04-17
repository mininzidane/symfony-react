import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  imageCarouselContain: {
    overflowX: 'hidden',
  },
  imageCarouselImages: {
    display: 'none',
  },
  imageCarousel: {
    marginBottom: '30%',
    overflow: 'visible',
    paddingBottom: '75%',

    '.indicator': {
      top: '102%',

      li: {
        height: '4em',
        width: '5em',
      },
    },
  },
}));
