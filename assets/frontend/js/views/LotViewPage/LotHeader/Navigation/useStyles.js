import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isRtl, breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'start',
    marginLeft: 'auto',
    marginTop: -2,

    '& > *:not(:last-child)': {
      marginRight: 12,

      [breakpoints.down('sm')]: {
        marginRight: 10,
      },
    },

    [breakpoints.down('lg')]: {
      width: '100%',
    },
  },
  link: {
    fontSize: '14px !important',
    lineHeight: '20px !important',
    fontWeight: '400 !important',
    padding: '10px 13px !important',
    minWidth: 40,
    height: 40,

    '&.is-select, &.is-abm-inventory, &.is-npa-inventory': {
      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, .5) !important',

      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, .15) !important',
      },

      '& $navLabel': {
        color: '#FFF !important',
      },

      '& path': {
        fill: '#FFF !important',
      },
    },

    '@media(max-width: 1365px)': {
      padding: '5px 9px !important',
    },

    [breakpoints.down('lg')]: {
      height: 30,
      padding: '5px 13px !important',
    },

    [breakpoints.down('sm')]: {
      padding: '5px 9px !important',
      minWidth: 30,
    },
  },
  arrow: {
    width: 10,
    height: 10,
    fill: 'none',
    transform: `scaleX(${isRtl ? -1 : 1})`,

    '&.is-disabled path': {
      fill: '#CCC',
    },

    '& path': {
      fill: '#333',
      fillRule: 'evenodd',
      clipRule: 'evenodd',
    },
  },
  accountControls: {
    display: 'flex',

    [breakpoints.down('lg')]: {
      marginRight: 'auto !important',
    },

    '& > *:nth-child(2)': {
      marginLeft: 12,

      [breakpoints.down('sm')]: {
        marginLeft: 10,
      },
    },
  },
  navLabel: {
    '&:first-child': {
      marginRight: 7,
    },

    '&:last-child': {
      marginLeft: 7,
    },

    '@media(max-width: 1365px)': {
      display: 'none',
    },

    [breakpoints.down('lg')]: {
      display: 'inline-block',
    },

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
