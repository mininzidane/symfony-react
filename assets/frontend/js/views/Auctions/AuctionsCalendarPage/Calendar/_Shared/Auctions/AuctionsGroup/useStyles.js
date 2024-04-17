import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    '&:first-child $title': {
      marginTop: -6,
      [breakpoints.up('xl')]: {
        marginTop: 0,
      },
    },
    '&:not(:first-child)': {
      marginTop: 8,
      [breakpoints.up('xl')]: {
        marginTop: 14,
      },
    },
    '&.is-live': {
      '& $dot, & $dot2': {
        backgroundColor: '#4A9029',
      },
      '& $auctionName': {
        color: '#2a7a3a',
        fontWeight: 700,
      },
      '& $title': {
        color: '#4A9029',

        [breakpoints.up('xl')]: {
          backgroundColor: '#EDF4EA',
        },
      },
    },
    '&.is-later': {
      '& $dot, & $dot2': {
        backgroundColor: '#2158F5',
      },
      '& $auctionName': {
        color: '#2158F5',
        fontWeight: 700,
      },
      '& $title': {
        [breakpoints.up('xl')]: {
          backgroundColor: '#F1F1F8',
        },
      },
    },
    '&.is-upcoming': {
      '& $dot, & $dot2': {
        backgroundColor: '#2158F5',
      },
      '& $auctionName': {
        color: '#2158F5',
      },
    },
    '&.is-ended': {
      '& $dot, & $dot2': {
        backgroundColor: '#828282',
      },
      '& $auctionName': {
        color: '#4F4F4F',
      },
      '& $title': {
        [breakpoints.up('xl')]: {
          backgroundColor: '#F2F2F2',
        },
      },
    },
  },
  title: {
    fontSize: 12,
    lineHeight: '22px',
    fontWeight: 700,
    marginBottom: 2,
    [breakpoints.up('xl')]: {
      minHeight: '22px',
      paddingTop: '4px',
      paddingBottom: '5px',
      marginBottom: 1,
      alignItems: 'start',
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#F2F2F2',
      marginLeft: -10,
      paddingLeft: 12,
      marginRight: -10,
      paddingRight: 12,
    },
    [breakpoints.between('xl', 1400)]: {
      lineHeight: '18px',
      alignItems: 'center',
      marginBottom: 6,
      minHeight: 18,
      fontSize: 10,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  dot: {
    display: 'none',
    [breakpoints.up('xl')]: {
      display: 'block',
      height: 5,
      width: 5,
      marginLeft: 4,
      borderRadius: 5,
      marginTop: 9,
    },
    [breakpoints.between('xl', 1400)]: {
      height: 4,
      width: 4,
      marginTop: 0,
    },
  },
  auctions: {
    backgroundColor: '#EDF4EA',
    borderRadius: 4,
    padding: '12px 0 8px',
    '& + $auctions': {
      marginTop: 6,
    },
    [breakpoints.up('xl')]: {
      backgroundColor: 'transparent',
      borderRadius: 0,
      padding: '3px 0 6px',
    },
  },
  country: {
    color: '#828282',
    fontSize: 10,
    lineHeight: '13px',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginTop: 5,
    padding: '0 14px',
    marginBottom: 2,

    [breakpoints.up('xl')]: {
      padding: 0,
      marginBottom: 5,
    },

    [breakpoints.between('xl', 1400)]: {
      marginTop: 0,
    },
  },
  more: {
    borderTop: '1px solid #D9D9D9',
    paddingTop: '7px',
    margin: '2px 14px 2px 14px',
    textAlign: 'center',
    fontSize: '12px',

    [breakpoints.up('xl')]: {
      textAlign: 'left',
      borderTop: 'none',
      paddingTop: 0,
      margin: '4px 0 0 0',
    },

    [breakpoints.between('xl', 1400)]: {
      fontSize: '10px',
    },
  },
  auction: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 14px 4px',
    fontSize: 12,
    lineHeight: '14px',
    [breakpoints.up('xl')]: {
      padding: '3px 0 3px',
      alignItems: 'flex-start',
      flexDirection: 'column',
    },
  },
  hoverable: {
    cursor: 'pointer',

    '&:hover, &:focus': {
      background: 'rgba(0, 113, 188, 0.2)',
      [breakpoints.up('xl')]: {
        marginLeft: -4,
        marginRight: -4,
        paddingLeft: 4,
        paddingRight: 4,
      },
    },
  },
  time: {
    fontSize: '12px',
    lineHeight: '15px',
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
    paddingLeft: '8px',
    [breakpoints.up('xl')]: {
      marginLeft: 0,
      paddingLeft: 0,
      paddingTop: 1,
      paddingBottom: 3,
    },
  },
  dot2: {
    display: 'block',
    height: 5,
    width: 5,
    marginLeft: 4,
    borderRadius: 5,
    marginTop: 5,
    [breakpoints.up('xl')]: {
      display: 'none',
    },
  },
  auctionName: {
    textTransform: 'uppercase',
    userSelect: 'none',
    fontSize: '12px',
    lineHeight: '15px',
    color: '#4A9029',
    [breakpoints.up('xl')]: {
      textTransform: 'none',
    },
  },
}));
