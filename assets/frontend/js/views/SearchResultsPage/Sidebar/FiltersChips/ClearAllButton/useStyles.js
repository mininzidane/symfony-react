import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20, 400),
    color: '#2158F5',
    display: 'grid',
    gridTemplateColumns: 'auto 12px',
    gridGap: 10,
    alignItems: 'center',
    position: 'relative',

    '& *': {
      position: 'relative',
      zIndex: 20,
    },

    '& svg': {
      marginTop: 2,
    },

    '&:hover::before': {
      opacity: 1,
    },

    '&::before': {
      transition: 'opacity .15s ease',
      opacity: 0,
      content: '""',
      top: -4,
      left: -6,
      right: -6,
      bottom: -4,
      position: 'absolute',
      pointerEvents: 'none',
      backgroundColor: '#EEF2FF',
      borderRadius: 4,
    },
  },
}));
