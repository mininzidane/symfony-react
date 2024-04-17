import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    listStyle: 'none',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',

    '&:hover': {
      '& $dropdownMenuContainer': {
        display: 'flex',
      },

      '& $toggle': {
        color: '#333333',

        '& path': {
          fill: '#333333',
        },

        '&::before': {
          display: 'block',
        },
      },
    },

    '&.is-placement-left-end': {
      position: 'static',
    },
  },
  toggle: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 14,
    lineHeight: '22px',
    fontWeight: 400,
    cursor: 'default',

    '&::after': {
      content: "''",
      position: 'absolute',
      top: -6,
      bottom: -6,
      left: -6,
      right: -6,
    },

    '&::before': {
      display: 'none',
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#F2F2F2',
      margin: [[-2, -6]],
      borderRadius: 4,
    },
  },
  label: {
    zIndex: 20,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  triangleIcon: {
    zIndex: 20,
    marginLeft: 6,

    '& path': {
      fill: '#FFF',
    },
  },
  rightTriangleIcon: {
    transform: 'rotate(-90deg) translateX(-1px)',
    marginLeft: '13px',
    '& path': {
      fill: '#FFF',
    },
  },
  dropdownMenuContainer: {
    display: 'none',
    position: 'absolute',
    top: '100%',
    left: -10,
    boxShadow: '0 2px 3px rgb(0 0 0 / 25%)',
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    overflow: 'hidden',
    backgroundColor: '#1D1E20',
  },
  dropdownMenuWrap: {
    display: 'flex',
    minWidth: 160,
    [breakpoints.down('md')]: {
      overflowX: 'auto',
      maxWidth: '100vw',
    },
  },
  dropdownMenuSpacer: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: -50,
    right: -50,
    bottom: -50,
    pointerEvents: 'all',
  },
  dropdownMenu: {
    padding: 0,
    position: 'relative',
    width: '100%',
    zIndex: 20,
  },
  dropdownMenuListItem: {
    display: 'block',
    position: 'relative',

    '&:first-child $dropdownMenuLink': {
      paddingTop: 8,
      borderTopColor: 'transparent',
    },

    '&:last-child $dropdownMenuLink': {
      paddingBottom: 8,
    },
    '&.is-category': {
      cursor: 'auto',
      '& $dropdownMenuLink': {
        fontWeight: 700,
      },
      '& + $dropdownMenuListItem': {
        '&:not(.is-category) $dropdownMenuLink': {
          borderTopColor: 'transparent',
        },
      },
      '& > span': {
        color: '#828282',
        paddingBottom: 0,
        maxWidth: '100%',
      },
    },
    '& span': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  dropdownMenuLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: [[6, 20, 6, 10]],
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFF',
    backgroundColor: '#1D1E20',
    borderTop: '1px solid #404952',
    whiteSpace: 'nowrap',

    '&:active': {
      color: '#FFF',
    },

    '&.is-active': {
      backgroundColor: '#0F0F0F',
    },

    '&.has-triangle': {
      paddingRight: 14,
      textDecoration: 'none',
    },
  },
  dropdownSubmenu: {
    padding: 0,
    position: 'relative',
    zIndex: 20,
    backgroundColor: '#0F0F0F',
    minWidth: 182,
    flexShrink: 0,
  },
  dropdownSubmenuListItem: {
    display: 'block',

    '&:first-child $dropdownSubmenuLink': {
      paddingTop: 9,
    },

    '&:last-child $dropdownSubmenuLink': {
      paddingBottom: 9,
    },
    '& span': {
      maxWidth: 190,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    [breakpoints.down('md')]: {
      '&.with-max-width span': {
        maxWidth: 142,
      },
    },
  },
  dropdownSubmenuLink: {
    display: 'flex',
    alignItems: 'center',
    padding: [[5, 30, 5, 30]],
    fontSize: 14,
    lineHeight: '20px',
    color: '#FFF',
    backgroundColor: '#0F0F0F',
    whiteSpace: 'nowrap',

    '&:active': {
      color: '#FFF',
    },
    '&:hover': {
      textDecoration: 'none',
      '& span:first-child': {
        textDecoration: 'underline',
      },
    },

    [breakpoints.down('md')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
  cnt: {
    color: '#828282',
  },
  loading: {
    padding: '12px 18px',
    position: 'relative',
    zIndex: 20,
    backgroundColor: '#0F0F0F',
    minWidth: 182,
  },
  newItem: {
    backgroundColor: '#FDB81D',
    borderRadius: 20,
    color: '#000000',
    padding: [[1, 4]],
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    fontSize: 10,
    marginLeft: 5,
    fontWeight: 700,
  },
}));
