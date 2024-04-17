import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    paddingTop: 3,
    paddingBottom: 25,

    [breakpoints.down('lg')]: {
      paddingBottom: 15,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 0,
      paddingBottom: 12,
    },
  },
  title: {
    ...mixins.font(34, 44, 400),
    margin: [[10, 0, 0]],

    [breakpoints.down('lg')]: {
      ...mixins.font(32, 38, 400),
      marginTop: 8,
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(22, 30),
    },
  },
  subtitle: {
    ...mixins.font(16, 24, 400),
    margin: [[5, 0, 0]],
    color: '#4F4F4F',

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20),
    },
  },
  crumbs: {
    padding: [[7, 0, 8]],
    borderBottom: '1px solid #DCDCE0',

    [breakpoints.down('sm')]: {
      position: 'relative',
      padding: '5px 0 4px !important',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100vw - 28px)',
      overflow: 'auto',

      '& span, & a': {
        fontSize: 11,
      },
    },
  },
  crumbsWrap: {
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      right: 0,
      top: 0,
      width: 25,
      height: '100%',
      background: 'linear-gradient(to right, transparent 0%, #F1F1F8 100%)',
    },
  },
}));
