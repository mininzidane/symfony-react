import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    minHeight: '100%',
    paddingBottom: '50px',
    position: 'relative',
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    outline: 'none',
    padding: '12px 14px',
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '20px',
    color: '#FFF',
    backgroundColor: '#1D1E20',
    whiteSpace: 'nowrap',
    width: '100%',
    justifyContent: 'flex-start',
    borderBottom: '1px solid #303133',
    position: 'sticky',
    top: '0',
  },
  label: {
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
    textAlign: 'left',
  },
  leftTriangleIcon: {
    transform: 'rotate(90deg)',
    marginRight: '10px',
    flexShrink: 0,
    '& path': {
      fill: '#FFF',
    },
  },
  list: {
    padding: '0',
    margin: '0',
  },
  listItem: {
    display: 'block',

    '&:first-child $link': {
      paddingTop: 11,
    },

    '&:last-child $link': {
      paddingBottom: 11,
    },
    '& span': {
      maxWidth: '80%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 14px',
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFF',
    backgroundColor: '#0F0F0F',
    whiteSpace: 'nowrap',

    '&:active': {
      color: '#FFF',
    },
    '&:hover': {
      textDecoration: 'none',
      '& span:first-child': {
        textDecoration: 'underline',
      },
    },
  },
  cnt: {
    color: '#828282',
  },
  loading: {
    padding: '12px 14px',
  },
}));
