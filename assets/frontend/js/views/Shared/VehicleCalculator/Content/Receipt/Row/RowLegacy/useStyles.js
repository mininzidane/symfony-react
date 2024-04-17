import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isMobileView }) => ({
  root: {
    display: 'flex',
    fontSize: 18,
    lineHeight: '25px',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #D6D4BD',

    [breakpoints.down(isMobileView ? 'xl' : 'sm')]: {
      fontSize: 14,
      lineHeight: '20px',
      marginBottom: 10,
    },
  },
  value: {
    paddingLeft: 15,
    marginLeft: 'auto',
    whiteSpace: 'nowrap',

    '&.is-loading': {
      opacity: 0.5,
    },
  },
  switch: {
    display: 'flex',
    marginRight: 15,
  },
  tooltipWrap: {
    whiteSpace: 'nowrap',
  },
  tooltipTrigger: {
    position: 'relative',
    top: -1,
  },
}));
