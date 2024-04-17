import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #E0E0E0',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 440,
    marginTop: 'auto',
  },
  value: {
    ...mixins.font(14, 24, 700),
    color: '#2158F5',
    width: '100%',
    padding: [[0, 2, 0, 8]],
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textDecorationStyle: 'dashed !important',
  },
  button: {
    height: 36,
    width: 36,
    backgroundColor: '#F2F2F2',
    flexShrink: 0,

    '& img': {
      position: 'relative',
      top: 1,
      left: 1,
    },

    '&:hover': {
      backgroundColor: '#E0E0E0',
    },
  },
  label: {
    ...mixins.font(14, 34, 700),
    display: 'flex',
    alignItems: 'center',
    textTransform: 'uppercase',
    height: 36,
    padding: [[0, 8]],
    backgroundColor: '#F2F2F2',
    flexShrink: 0,
  },
}));
