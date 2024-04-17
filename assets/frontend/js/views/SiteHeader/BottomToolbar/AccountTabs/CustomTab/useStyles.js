import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
  },
  wrapper: {
    lineHeight: '15px',

    '& > *:first-child': {
      marginBottom: '5px',
    },
  },
  labelIcon: {
    padding: [[10, 8, 8]],
    fontSize: '11px',
    fontWeight: '400',
    textTransform: 'none',
    color: '#000',
    minWidth: '57px',
    flexShrink: '1',
    width: '100%',
    minHeight: 'auto',

    '& $wrapper > *:first-child': {
      marginBottom: '2px',
    },
  },
  selected: {
    color: '#2158F5',
  },
  textColorInherit: {
    opacity: 1,
  },
}));
