import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  steps: {
    padding: '12px 0',
  },
  step: {
    display: 'flex',
    position: 'relative',
    paddingLeft: '36px',
    minHeight: '46px',
    fontSize: '14px',
    lineHeight: '16px',
    color: '#D5D5D5',
    '&:first-child:after': {
      display: 'none',
    },
    '&:last-child': {
      minHeight: '26px',
    },
    '&:after': {
      content: "''",
      width: '6px',
      height: '46px',
      position: 'absolute',
      top: '-38px',
      left: '5px',
      background: '#D5D5D5',
    },
    '&:before': {
      content: "''",
      position: 'absolute',
      top: '0',
      left: '0',
      width: '16px',
      height: '16px',
      borderRadius: '50%',
      background: '#D5D5D5',
      zIndex: '9',
    },
    '&.is-completed': {
      color: '#000',
      '&:after, &:before': {
        background: '#5D5D5D',
      },
    },
    '&.is-current': {
      color: '#3A7400',
      '&:after': {
        background: '#5D5D5D',
      },
      '&:before': {
        background: '#3A7400!important',
      },
    },
  },
  errMessage: {
    fontSize: '16px',
    lineHeight: '21px',
    color: '#981B1E',
  },
}));
