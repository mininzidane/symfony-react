import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  tickbox: {
    marginBottom: 14,
    marginRight: 1,
    position: 'relative',

    '&:last-child': {
      marginBottom: 0,
    },

    '& label': {
      display: 'flex',
      paddingLeft: 28,
      position: 'relative',
      zIndex: 2,
    },

    '& span': {
      ...mixins.font(14, 20, 400),
    },

    '&:hover::before': {
      opacity: 1,
    },

    '&::before': {
      transition: 'opacity .15s ease',
      opacity: 0,
      content: '""',
      top: -6,
      left: -6,
      right: -6,
      bottom: -6,
      position: 'absolute',
      pointerEvents: 'none',
      backgroundColor: '#EEF2FF',
      borderRadius: 4,

      [breakpoints.down('md')]: {
        display: 'none !important',
      },
    },

    '& input:checked + label *': {
      color: '#2158F5',
    },
  },
  count: {
    marginLeft: 'auto',
  },
  title: {
    ...mixins.font(12, 20, 700),
    color: '#808080',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  showMoreBtn: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',

    '&:hover, &:active, &:focus': {
      color: '#2158F5',
      fill: '#2158F5',
    },
  },
  showMoreIcon: {
    marginRight: 11,
    width: 20,
    height: 20,
    lineHeight: '20px',
    verticalAlign: 'middle',
    textAlign: 'center',
    transition: 'transform .2s',
  },
  expanded: {
    transform: 'rotate(180deg)',
  },
  highlight: {
    color: '#F06B00',
    background: 'transparent',
  },
  groupTitle: {
    margin: [[18, 0, 12]],

    '& label': {
      ...mixins.font(14, 20, 400),
    },

    '&:first-child': {
      display: 'none',
    },
  },
  groupContent: {
    '&:not(:nth-child(2))': {
      paddingLeft: 28,
    },
  },
}));
