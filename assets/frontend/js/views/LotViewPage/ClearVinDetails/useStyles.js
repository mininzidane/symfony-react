import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    alignSelf: 'self-start',
  },
  placeholder: {
    position: 'relative',

    '&::after': {
      content: '""',
      ...mixins.absolute(-2, -2, -2, -2),
      zIndex: 5,
      background: '#F1F1F8',
      opacity: 0.95,
    },
  },
  vinDetailsRow: {
    borderTop: '1px solid #E3E3E3',
    paddingTop: 8,
  },
  cta: {
    background: '#E6ECFD',
    borderRadius: 6,
    padding: 14,
  },
  titleWrap: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  properties: {
    marginTop: '-8px',
  },
  auctionSales: {
    marginBottom: 14,
  },
  title: {
    backgroundColor: '#FFF1D2',
  },
}));
