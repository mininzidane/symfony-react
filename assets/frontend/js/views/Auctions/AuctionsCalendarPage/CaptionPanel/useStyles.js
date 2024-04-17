import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  panelContent: {
    minHeight: 64,

    [breakpoints.down('sm')]: {
      minHeight: 48,
    },
  },
  viewMode: {
    display: 'flex',
  },
  hideTimesBtn: {
    marginRight: 8,
    [breakpoints.down('lg')]: {
      display: 'none',
    },
  },
}));
