import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  popover: {
    position: 'relative',
    width: 340,
  },
  loading: ({ isCtaBlockHidden }) => ({
    minHeight: isCtaBlockHidden ? 244 : 390,
  }),
  name: {
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 700,
    marginBottom: 20,
  },
}));
