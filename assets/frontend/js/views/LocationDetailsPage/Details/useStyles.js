import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    paddingBottom: 25,
    marginTop: 28,
  },
  title: {
    ...mixins.font(24, 32, 400),

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24),
    },
  },
  toolbar: {
    marginTop: 7,

    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 1,
      left: 0,
      width: '100%',
      borderBottom: '1px solid #CCCCCC',
    },
  },
  tab: {
    fontWeight: 700,
  },
  tabContent: {
    ...mixins.font(18, 24, 400),
    paddingTop: 18,

    '& table': {
      '& td, & th': {
        fontSize: '16px !important',
      },
    },
  },
  indicatorClassName: {
    zIndex: 2,
  },
  feesDesc: {
    ...mixins.font(13, 18, 25),
    marginTop: 15,
    marginBottom: 15,
  },
  laneDesc: {
    marginBottom: 15,
  },
}));
