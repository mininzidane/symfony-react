import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'relative',
    marginBottom: 12,
  },
  input: {
    ...mixins.font(14, 20, 400),
    padding: [[4, 28, 4, 12]],
    height: 36,
    border: '1px solid #BDBDBD',
    width: '100%',
    color: '#2a2a2a',
    borderRadius: 4,

    '&:hover': {
      borderColor: '#757575',
    },

    '&:active, &:focus': {
      borderColor: '#2158F5',
    },
  },
  resetQueryBtn: {
    position: 'absolute',
    width: 34,
    height: 34,
    top: 1,
    right: 0,
    zIndex: 1,
    fontSize: 0,

    '& svg': {
      fill: '#757575',
    },

    '&:hover': {
      '& svg': {
        fill: '#2158F5',
      },
    },
  },
}));
