import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    fontWeight: '700',
    fontSize: '12px',
    lineHeight: '16px',
    textTransform: 'uppercase',
    minHeight: '44px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div:first-child': {
      color: '#828282',
    },
    [breakpoints.down(1400)]: {
      lineHeight: '14px',
    },
  },
}));
