import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    '&.is-checked circle': {
      display: 'block',
    },
    '& input': {
      display: 'none',
    },
    '& label': {
      ...mixins.font(16, 18, 400),
      color: '#000',
      position: 'relative',
      display: 'block',
      paddingLeft: 30,

      '&::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        width: '18px',
        height: '18px',
        background: 'rgba(112, 198, 161, .2)',
        transform: 'scale(0)',
        transition: 'all 0.15s ease',
        borderRadius: '50%',
      },
    },
    '&.is-animating': {
      '& label::before': {
        background: 'rgba(13, 93, 184, 0.2)',
        animation: 'bounce 0.3s ease',
        borderColor: 'transparent',
      },
    },
  },
  icon: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '19px',
    height: '19px',
    '& circle': {
      display: 'none',
    },
  },
}));
