import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView }) => ({
  root: {
    display: 'grid',
    padding: [[18, 30]],
    gridTemplateColumns: '1fr',
    gridGap: 10,

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      padding: '20px 14px 16px 14px',
    },
  },
  wrap: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 14,

    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      display: 'block',
    },
  },
  agreement: {
    textAlign: 'left',
    paddingTop: 0,
    paddingLeft: '12px',
    [breakpoints.down(isMobileView ? 'xl' : 'lg')]: {
      fontSize: '14px',
      lineHeight: '16px',
      paddingTop: '12px',
      paddingLeft: 0,
      textAlign: 'center',
    },
  },
}));
