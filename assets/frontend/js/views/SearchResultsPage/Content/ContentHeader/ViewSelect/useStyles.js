import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
  },
  button: {
    ...mixins.font(14, 20, 700),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #BDBDBD',
    transition: 'all .15s ease',
    backgroundColor: 'transparent',
    boxShadow: '0px 1px 2px transparent',
    width: 30,
    height: 30,

    '&:first-child': {
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      marginRight: -1,
    },

    '&:last-child': {
      borderTopRightRadius: 4,
      borderBottomRightRadius: 4,
    },

    '& rect': {
      stroke: '#4F4F4F',
      transition: 'all .15s ease',
    },

    '&:hover': {
      borderColor: '#2158F5',
      backgroundColor: '#F1F1F8',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',

      '& rect': {
        stroke: '#2158F5',
      },
    },

    '&.is-active': {
      backgroundColor: '#FFF',
      borderColor: '#2158F5',
      pointerEvents: 'none',
      zIndex: 20,

      '& rect': {
        stroke: '#2158F5',
      },
    },
  },
}));
