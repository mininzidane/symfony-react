import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[3, 0, 4]],
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    '&:not(:first-child)': {
      borderTop: '1px solid #E3E3E3',
    },
  },
  label: {
    marginRight: 10,
    flexShrink: 0,
    maxWidth: '50%',
  },
  value: {
    fontWeight: 700,
    textAlign: 'right',
    color: '#333',

    [breakpoints.down('xs')]: {
      wordBreak: 'break-word',
    },
  },
}));
