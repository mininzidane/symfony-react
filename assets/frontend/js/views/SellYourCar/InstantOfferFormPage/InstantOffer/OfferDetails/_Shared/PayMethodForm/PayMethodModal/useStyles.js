import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {},
  container: {
    display: 'grid',
    gridGap: '10px',
    color: '#333',
  },
  footer: {
    backgroundColor: '#F6F6F6',
    border: 'none',
    paddingTop: 0,
    paddingBottom: 20,
  },
  separator: {
    backgroundColor: '#C4C4C4',
    height: 1,
    position: 'relative',
    marginTop: '4px',
    marginBottom: '4px',
    '& span': {
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#F6F6F6',
      fontSize: '10px',
      lineHeight: '13px',
      color: '#999999',
      paddingLeft: '11px',
      paddingRight: '11px',
      top: '-6px',
      textTransform: 'uppercase',
    },
  },
  bankName: {
    fontSize: '12px',
    lineHeight: '18px',
    marginTop: '-10px',
  },
}));
