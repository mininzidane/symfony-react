import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    fontSize: 16,
    borderRadius: [[4, 4, 0, 0]],
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#2158F5',
    display: 'flex',
    padding: [[0, 20]],
    color: '#fff',
    fontWeight: 700,
    justifyContent: 'space-between',
    height: 42,
    alignItems: 'center',
  },
  content: {
    padding: [[16, 20]],
    fontSize: 14,
    lineHeight: '20px',
    background: '#fff',
  },

  dots: {
    textAlign: 'center',
    margin: [[0, -5]],
  },
  dot: {
    display: 'inline-box',
    opacity: 0.5,
    width: 4,
    height: 4,
    boxSizing: 'border-box',
    border: '1px solid #2158F5',
    borderRadius: '50%',
    margin: [[0, 5]],

    // screen reader only text
    // + <button> content shouldn't be empty
    '& > span': {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: 0,
    },
  },
  dotFilled: {
    backgroundColor: '#2158F5',
  },
  dotActive: {
    width: 8,
    height: 8,
    opacity: 1,
    backgroundColor: '#2158F5',
  },

  footer: {
    borderTop: '1px solid #E0E0E0',
    padding: [[16, 20]],
    display: 'flex',
    justifyContent: 'space-between',
    background: '#fff',
  },
}));
