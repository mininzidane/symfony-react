import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  accordionExpanded: {
    '& $arrow': {
      transform: 'none',
      transition: 'opacity 0.2s',
    },
    '& $arrow rect:last-child': {
      opacity: 0,
    },
  },
  arrow: {
    marginLeft: 'auto',
    marginRight: 0,
    height: 12,
  },
  accordionItem: {
    marginBottom: 0,
    position: 'relative',
  },
  accordionContent: {
    ...mixins.scrollbar('xs', '#E1E1E1'),
    marginTop: 0,
    paddingTop: 14,
    paddingBottom: 14,
    maxHeight: 315,
    overflowY: 'scroll',
    marginRight: -25,
    paddingRight: 22,
    paddingLeft: 6,
    marginLeft: -6,

    '&.is-overflow': {
      overflow: 'visible',
    },

    [breakpoints.down('sm')]: {
      marginRight: -17,
      paddingRight: 9,
    },
  },
  accordionHeader: {
    color: '#333',
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '20px',
    paddingTop: 11,
    paddingBottom: 11,
    userSelect: 'none',
    position: 'relative',

    '& > *': {
      position: 'relative',
      zIndex: 20,
    },

    '&::before': {
      transition: 'all .15s ease',
      position: 'absolute',
      content: '""',
      top: 0,
      left: -30,
      right: -30,
      bottom: 0,
      background: '#F2F2F2',
      borderTop: '1px solid #E0E0E0',
      boxShadow: '0px 1px 2px transparent',

      [breakpoints.down('md')]: {
        left: -20,
        right: -20,
      },
    },

    '&:hover::before': {
      background: '#F9F8F9',
    },

    '&:hover, &:active, &:focus': {
      color: '#2158F5',
      fill: '#2158F5',
      transition: 'color .2s ease',
    },
  },
  accordionItemTitle: {
    display: 'flex',
    paddingRight: 12,
    width: '100%',
    gap: 12,
  },
  accordionItemDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#2158F5',
    alignSelf: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  accordionItemLabel: {
    fontSize: 14,
    lineHeight: '18px',
  },
  resetBtn: {
    ...mixins.font(14, 18, 400),
    zIndex: '1',
    color: '#2158F5',
    marginLeft: 'auto',

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
