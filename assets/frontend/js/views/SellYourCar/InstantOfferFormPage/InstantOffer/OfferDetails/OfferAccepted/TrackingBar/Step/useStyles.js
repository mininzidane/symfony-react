import { makeStyles } from '@material-ui/core/styles';
import CheckmarkSvg from './img/checkmark.svg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    zIndex: 21,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    boxShadow: '0px 1px 2px rgb(0 0 0 / 20%)',

    [breakpoints.down('sm')]: {
      width: 16,
      height: 16,
    },

    '&.is-completed': {
      backgroundColor: '#4A9029',
      '&:not(.is-active)': {
        backgroundImage: `url(${CheckmarkSvg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
    },

    '&.is-active': {
      width: 40,
      height: 40,
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',

      [breakpoints.down('sm')]: {
        width: 32,
        height: 32,
      },
    },
    '&:nth-child(1)': {
      '& $label': {
        [breakpoints.down('lg')]: {
          left: 0,
        },
      },
      '& img': {
        [breakpoints.down('sm')]: {
          width: 21,
          height: 17,
        },
      },
    },
    '&:nth-child(2) img': {
      position: 'relative',
      top: '-1px',
      [breakpoints.down('sm')]: {
        width: 20,
        height: 16,
      },
    },
    '&:nth-child(3) img': {
      [breakpoints.down('sm')]: {
        width: 18,
        height: 18,
      },
    },
    '&:nth-child(4) img': {
      [breakpoints.down('sm')]: {
        width: 20,
        height: 14,
      },
    },
    '&:nth-child(5)': {
      width: 40,
      height: 40,
      backgroundColor: '#E0E0E0',
      boxShadow: '0px 1px 2px rgb(0 0 0 / 20%)',

      [breakpoints.down('sm')]: {
        width: 32,
        height: 32,
      },

      '& img': {
        position: 'relative',
        left: 1,
        top: -1,
        [breakpoints.down('sm')]: {
          width: 22,
          height: 14,
          top: 0,
          left: 0,
        },
      },

      '&.is-completed': {
        backgroundColor: '#4A9029',
      },

      '& $label': {
        [breakpoints.down('lg')]: {
          right: 0,
        },
      },
    },
  },
  label: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#4A9029',
    position: 'absolute',
    whiteSpace: 'nowrap',
    bottom: '-22px',
  },
}));
