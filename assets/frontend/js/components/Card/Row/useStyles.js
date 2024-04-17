import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: [[5, 0]],
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    lineHeight: '20px',

    '&:not(:first-child)': {
      paddingTop: 4,
      borderTop: '1px solid #E3E3E3',
    },
  },
  label: {
    marginRight: 10,
    flexShrink: 0,
    maxWidth: '50%',
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
  },
  value: {
    fontWeight: 700,
    lineHeight: '22px',
    color: '#333',
    textAlign: 'right',
  },
}));
