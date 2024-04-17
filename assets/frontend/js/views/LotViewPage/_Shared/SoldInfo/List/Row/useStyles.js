import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: [[4, 0]],
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    fontSize: 14,
    lineHeight: '22px',

    '&:not(:first-child)': {
      borderTop: '1px solid #E3E3E3',
    },
  },
  label: {
    marginRight: 10,
    flexShrink: 0,
    maxWidth: '50%',
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
    paddingLeft: 18,
  },
  value: {
    fontWeight: 700,
    color: '#333',
    textAlign: 'right',
    paddingRight: 18,
  },
}));
