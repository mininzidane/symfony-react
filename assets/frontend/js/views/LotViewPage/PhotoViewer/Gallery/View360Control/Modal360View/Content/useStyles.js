import { makeStyles } from '@material-ui/core/styles';
import MagnifyingGlassWhiteSvg from 'frontend/images/shared/various/magnifying-glass-white.svg';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    '.pnlm-container:fullscreen canvas': {
      width: '100vw !important',
      height: '100vh !important',
      maxHeight: '100vh !important',
    },
    '.pnlm-orientation-button': {
      display: 'none !important',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#2158F5',
    padding: [[6, 20]],
    position: 'relative',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,

    [breakpoints.down('sm')]: {
      padding: [[12, 8, 16]],
      flexWrap: 'wrap',
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
  },
  controls: {
    display: 'flex',

    [breakpoints.down('sm')]: {
      marginTop: 10,
      width: '100%',
    },
  },
  closeButton: {
    marginLeft: 'auto',

    [breakpoints.down('sm')]: {
      position: 'absolute',
      top: 16,
      right: 14,
    },
  },
  body: {
    padding: 18,
    position: 'relative',

    [breakpoints.down('sm')]: {
      padding: 8,
    },

    '& .cloudimage-360': {
      textAlign: 'center',
      width: '100%',
      height: '100%',
    },

    '& .cloudimage-inner-box': {
      position: 'relative',
      height: '100%',
    },

    '& .cloudimage-360 canvas': {
      height: '100% !important',
      width: 'auto !important',
      maxHeight: 'calc(100vh - 106px)',
      maxWidth: '100%',
      display: 'block',

      '& ~ div:last-child': {
        height: '40px !important',
        width: '40px !important',
        top: '14px !important',
        left: '14px !important',
        backgroundColor: 'rgba(51, 51, 51, .65) !important',
        borderRadius: 4,
        cursor: 'pointer',
        backgroundSize: '16px !important',
        backgroundImage: `url(${MagnifyingGlassWhiteSvg}) !important`,

        [breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },
  },
}));
