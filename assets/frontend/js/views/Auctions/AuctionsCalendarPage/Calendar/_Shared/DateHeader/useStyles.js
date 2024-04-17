import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    color: '#333333',
    display: 'flex',
    alignItems: 'center',
    '&.is-active': {
      color: '#2158F5',
      '& $monthAndYear': {
        color: '#2158F5',
      },
    },
  },
  day: {
    marginRight: 8,
    fontSize: 38,
    lineHeight: '44px',
    marginBottom: 'auto',
    [breakpoints.between('xl', 1400)]: {
      fontSize: '30px',
      lineHeight: '28px',
      marginRight: '4px',
    },
  },
  weekday: {
    fontWeight: 700,
    fontSize: 14,
    lineHeight: '16px',
    [breakpoints.between('xl', 1400)]: {
      fontSize: '12px',
      lineHeight: '14px',
    },
  },
  monthAndYear: {
    color: '#4F4F4F',
    fontSize: 12,
    lineHeight: '19px',
    [breakpoints.between('xl', 1400)]: {
      lineHeight: '14px',
    },
  },
}));
