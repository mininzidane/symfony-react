import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isRtl }) => ({
  root: {
    order: isRtl ? 1 : 0,
  },
  watched: {
    '& svg *': {
      fill: '#2158F5',
    },
  },
}));
