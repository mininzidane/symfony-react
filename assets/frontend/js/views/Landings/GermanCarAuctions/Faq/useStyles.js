import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    padding: '42px 15px',

    [breakpoints.down('sm')]: {
      padding: '30px 14px',
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[0, 0, 15]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: 0,
    },
  },
  accordion: {
    marginTop: 24,

    '& > div': {
      maxWidth: 1140,
    },
  },
  accordionItem: {
    position: 'relative',
    padding: '20px 20px 10px 20px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.25)',
    border: '1px solid rgba(13, 102, 204, 0.05)',
    borderRadius: 4,
    textAlign: 'left',
    maxWidth: 770,
    marginLeft: 'auto',
    marginRight: 'auto',
    cursor: 'pointer',
    userSelect: 'none',

    '&:hover $arrow rect': {
      fill: '#2157F5',
    },
  },
  expanded: {
    '& $arrow rect:last-child': {
      display: 'none',
    },
  },
  arrow: {
    position: 'absolute',
    right: 0,
    color: '#C4C4C4',

    '& rect': {
      transition: 'all .2s ease',
    },
  },
  header: {
    fontSize: '18px',
    lineHeight: 'normal',
    fontWeight: 700,
    marginBottom: 9,
    position: 'relative',
    cursor: 'pointer',
    paddingRight: 20,

    '&::after': {
      content: '""',
      position: 'absolute',
      top: -20,
      left: -20,
      right: -20,
      bottom: -20,
    },
  },
  content: {
    fontSize: '14px',
    lineHeight: '24px',
    paddingBottom: 10,
    marginTop: 0,
  },
}));
