import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'auto',
    width: '100%',
    position: 'relative',
    marginTop: -8,
  },
  wrap: {
    display: 'table',
    width: '100%',
    paddingLeft: '10px',
    paddingRight: '10px',
  },
  filesList: {
    display: 'flex',
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
    },
  },
  file: {
    background: '#FFF1D2',
    border: '1px solid #FED883',
    boxSizing: 'border-box',
    borderRadius: '2px',
    display: 'flex',
    alignItems: 'center',
    height: 24,
    padding: '0 7px',
    minWidth: 127,
    fontSize: '12px',
    justifyContent: 'space-between',
    marginRight: '6px',
    marginBottom: '6px',
    '&:last-child': {
      marginRight: 0,
    },
  },
  filename: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '240px',
    marginRight: '10px',
  },
}));
