import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints, isMobileView }) => ({
  root: {
    ...mixins.font(18, 20),
    alignItems: 'center',

    '&:not(:last-child)': {
      paddingBottom: 12,
      marginBottom: 12,
      borderBottom: '1px solid #D6D4BD',
    },

    [breakpoints.down(isMobileView ? 'xl' : 'md')]: {
      ...mixins.font(14, 18),
    },
  },
  number: {
    color: '#333333',
    width: '24px',
    height: '24px',
    fontSize: '16px',
    minWidth: '18px',
    background: '#FDB81E',
    minHeight: '18px',
    textAlign: 'center',
    lineHeight: '23px',
    borderRadius: '50%',

    [breakpoints.down(isMobileView ? 'xl' : 'md')]: {
      ...mixins.circle(14, '#FDB81E'),
      lineHeight: '14px',
    },
  },
}));
