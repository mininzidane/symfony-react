import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    backgroundColor: '#E6ECFD',
    borderRadius: '6px',
    marginLeft: 14,
    marginRight: 14,
    marginBottom: 14,
  },
  offerInput: {
    paddingBottom: 14,
    width: '100%',
  },
  inputLabel: {
    paddingBottom: '6px',
    color: '#333',
  },
  actions: {
    margin: '-14px',
    display: 'flex',
    padding: '7px',
    flexWrap: 'wrap-reverse',
  },
  btn: {
    flexGrow: '1',
    minWidth: 'fit-content',
    flexBasis: '0',
    margin: '7px',
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
  },
  caption: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -14,
    position: 'relative',
    marginLeft: -14,
    marginBottom: 8,
    width: 'calc(100% + 28px)',
    backgroundColor: '#CBD6F7',
    padding: [[4, 14]],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  recommendedBidButton: {
    borderBottom: '1px dashed',
    marginLeft: 5,

    '&:hover': {
      borderColor: 'transparent',
    },
  },
  tickbox: {
    padding: [[12, 0, 5]],
  },
  tickboxLabel: {
    ...mixins.font(14, 20),
  },
  description: {
    ...mixins.font(14, 20, 400),
    textAlign: 'center',
    paddingBottom: 14,
    marginTop: -4,
  },
}));
