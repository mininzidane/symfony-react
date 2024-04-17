import { makeStyles } from '@material-ui/core/styles';
import ViewportService from 'frontend/js/lib/utils/ViewportService';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'fixed',
    display: 'flex',
    top: () => ViewportService.getHeaderHeight() - 12 - 32, // 32 - height of black main menu, 12 - padding
    right: 27,
    width: 'auto',
    maxHeight: 'calc(100vh - 48px)',
    zIndex: 50001,
    minWidth: 347,
    boxShadow: 'rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px',

    [breakpoints.down('lg')]: {
      top: 50,
    },

    [breakpoints.down('md')]: {
      right: 14,
    },

    [breakpoints.down('sm')]: {
      top: 'auto !important',
      right: 5,
      bottom: 61, // 56 + 5
      width: 'calc(100% - 10px)',
      maxHeight: 'calc(100vh - 88px)',
      minWidth: 240,
    },
  },
  accountMenu: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    transform: 'translateY(-15px)',
    transition: 'transform 225ms ease-out',
    overflow: 'auto',
    display: 'flex',
    height: 'auto',
    width: '100%',

    [breakpoints.down('sm')]: {
      borderRadius: 10,
    },

    '&.is-open': {
      transform: 'translateY(0)',
    },
  },
  accountMenuInner: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    [breakpoints.down('sm')]: {
      overflowY: 'auto',
    },
  },
  accountMenuWrapper: {
    ...mixins.flex('between', 'flex-end'),
    flexWrap: 'wrap',
    padding: [[0, 14]],
    width: '100%',

    [breakpoints.down('lg')]: {
      paddingBottom: 0,
    },

    [breakpoints.down('sm')]: {
      paddingBottom: 0,
      padding: [[0, 17]],
      flexShrink: 0,
    },
  },
  accountMenuGreetingCaption: {
    ...mixins.font(14, 14, 400),
    width: '100%',

    [breakpoints.down('lg')]: {
      marginTop: 10,
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20),
    },

    '& strong': {
      fontWeight: 700,
    },
  },
  accountMenuMemberId: {
    ...mixins.font(12, 14, 400),
    color: '#777777',
  },
  accountMenuMembership: {
    padding: [[7, 12, 13]],
    margin: 14,
    borderRadius: 6,
    backgroundColor: '#FCFAEC',

    [breakpoints.down('sm')]: {
      padding: [[7, 15, 15]],
      margin: [[10, 14, 0]],
    },
  },
  accountMenuMembershipTitle: {
    ...mixins.font(12, 28, 400),
    textAlign: 'center',

    '& strong': {
      fontWeight: 700,
    },
  },
  accountMenuMembershipButton: {
    fontSize: '14px !important',
    letterSpacing: '0.5px',
  },
  accountMenuList: {
    padding: 0,
    listStyle: 'none',
    margin: [[12, 0]],

    [breakpoints.down('sm')]: {
      margin: [[8, 0, 14]],
    },
  },
  accountMenuLink: {
    ...mixins.flex('start', 'center'),
    ...mixins.font(16, 16),
    lineHeight: '32px',
    color: '#000000',
    textDecoration: 'none !important',
    borderRadius: 2,

    [breakpoints.down('sm')]: {
      lineHeight: '28px',
      paddingLeft: 3,
    },

    '&:hover': {
      backgroundColor: '#F0F0F6',
    },
  },
  accountMenuLinkIcon: {
    ...mixins.flex('center'),
    width: 46,

    '& img': {
      display: 'block',
    },
  },
  accountMenuLinkText: {
    padding: [[8, 16, 8, 0]],

    [breakpoints.down('sm')]: {
      paddingLeft: 2,
    },
  },
  overlay: {
    position: 'fixed',
    top: () => ViewportService.getHeaderHeight() - 32, // 32 - height of black main menu
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 50000,
    outline: 'none',
    backgroundColor: 'rgba(0, 0, 0, .75)',

    [breakpoints.down('sm')]: {
      top: '0 !important',
      bottom: 56,
    },
  },
}));
