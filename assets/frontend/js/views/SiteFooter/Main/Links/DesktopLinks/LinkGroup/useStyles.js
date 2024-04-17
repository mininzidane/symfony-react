import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  title: {
    position: 'relative',
    minHeight: 22,
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 700,
    marginBottom: 18,
    color: '#FDB81E',
    paddingRight: 20,
  },
  link: {
    color: '#FFF !important',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    marginTop: 4,
    display: 'block',
    width: '100%',
    paddingRight: 20,
  },
  nowrapTitle: {
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));
