import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    transition: ({ duration }) => `margin-top ${duration}ms ease`,
    marginTop: 0,

    '&.is-active': {
      marginTop: -24,

      '& $button': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      },
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: [[2, 10]],
    height: 24,
    backgroundColor: '#333',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    minWidth: 120,
    transition: 'background-color .15s ease',

    '&:hover': {
      backgroundColor: '#555',
    },
  },
  label: {
    ...mixins.font(14, 18, 400),
    margin: [[0, 12, 0, 8]],
    color: '#FFF',
  },
  triangle: {
    marginLeft: 'auto',
  },
}));
