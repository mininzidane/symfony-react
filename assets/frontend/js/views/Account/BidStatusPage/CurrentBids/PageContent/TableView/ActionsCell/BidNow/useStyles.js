import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    placeItems: 'center',
    gridGap: ({ hasBuyItNow }) => (hasBuyItNow ? 4 : 6),
    minWidth: 160,
    paddingTop: ({ hasBuyItNow }) => (hasBuyItNow ? 0 : 3),
  },
  buyItNowLink: {
    ...mixins.font(13, 16, 400),
    color: '#226900',
    textAlign: 'center',
  },
  maxBid: {
    ...mixins.font(13, 16, 400),
  },
}));
