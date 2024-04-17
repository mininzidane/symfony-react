import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  header: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '24px',
    color: '#FDB81E',
    userSelect: 'none',
  },
  expanded: {
    '& $header': {
      fontWeight: 400,
    },
  },
  arrow: {
    height: 11,
    marginTop: 2,
  },
  content: {
    paddingBottom: 15,
    marginTop: 12,
  },
  link: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '28px',
    display: 'block',
    color: '#FFF !important',
  },
  accordionItem: {
    marginBottom: 12,
  },
}));
