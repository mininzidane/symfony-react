import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'block',
    color: '#2158F5',
    height: 12,
    padding: 0,
    margin: [[14, 0, 0]],
  },
  thumb: {
    height: 21,
    width: 21,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    border: '2px solid #E9EEFE',
    marginTop: -8,
    marginLeft: -16,

    '&:focus, &:hover, &$active': {
      boxShadow: '0px 1px 2px rgba(0,0,0,0.25)',
    },

    '&::after': {
      top: -10,
      left: -10,
      right: -10,
      bottom: -10,
    },

    '&::before': {
      content: "''",
      position: 'absolute',
      top: 4,
      left: 4,
      width: 9,
      height: 9,
      backgroundColor: '#2158F5',
      borderRadius: '50%',
    },
  },
  active: {},
  mark: {
    display: 'none',
  },
  markLabel: {
    height: 4,
    width: 1,
    top: -8,
    backgroundColor: '#C5C5C5',
  },
  markLabelActive: {
    backgroundColor: '#777',
  },
  track: {
    height: 5,
  },
  rail: {
    height: 5,
    backgroundColor: '#E9EEFE',
    opacity: 1,
  },
  valueLabel: {
    left: '-50%',
    width: 32,
    top: -26,

    '& > span': {
      transform: 'none',
      width: '100%',
      backgroundColor: 'transparent',

      '&::after': {
        content: "''",
        top: '23px',
        left: '50%',
        width: '8px',
        height: '8px',
        position: 'absolute',
        transform: 'rotate(45deg)',
        marginLeft: '-4px',
        color: '#FFF',
        backgroundColor: '#333333',
      },
    },

    '& > span > span': {
      fontSize: 12,
      lineHeight: '14px',
      fontWeight: 400,
      position: 'absolute',
      textAlign: 'center',
      left: '50%',
      padding: [[5, 12]],
      borderRadius: '15px',
      backgroundColor: '#333333',
      color: '#FFF',
      transition: 'transform .1s linear',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.15)',
      transform: 'translate(-50%)',

      [breakpoints.down('sm')]: {
        transform: ({ isValueCloseToMax }) => `translate(-${isValueCloseToMax ? 75 : 50}%)`,
      },
    },
  },
}));
