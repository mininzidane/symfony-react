import { makeStyles } from '@material-ui/core/styles';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: ViewportService.isRtl() ? 'row-reverse' : 'row',

    [breakpoints.up('md')]: {
      position: 'absolute',
      right: 0,
      top: 0,
    },

    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));
